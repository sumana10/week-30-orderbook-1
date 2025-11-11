import { useEffect, useRef } from "react";
import { ChartManager } from "../utils/ChartManager";
import { getKlines } from "../utils/httpClient";
import { KLine } from "../utils/types";
import { SignalingManager } from "../utils/SignalingManager";

export function TradeView({
  market,
}: {
  market: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);

  useEffect(() => {
    const init = async () => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(
          market,
          "15m",
          Math.floor((Date.now() - 1000 * 60 * 60 * 24 * 7) / 1000),
          Math.floor(Date.now() / 1000)
        );
      } catch (e) {
        console.error(e);
      }

      if (chartRef.current) {
        if (chartManagerRef.current) chartManagerRef.current.destroy();

        const chartManager = new ChartManager(
          chartRef.current,
          klineData.map((x) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          })),
          { background: "#0e0f14", color: "white" }
        );

        chartManagerRef.current = chartManager;

        const sm = SignalingManager.getInstance();

        sm.registerCallback(
          "ticker",
          (data: any) => {
            const price = parseFloat(data.lastPrice);
            if (!price || !chartManagerRef.current) return;

            chartManagerRef.current.update({
              time: Date.now(),
              close: price,
              high: price,
              low: price,
              open: price,
            });
          },
          `TICKER-${market}`
        );

        sm.sendMessage({
          method: "SUBSCRIBE",
          params: [`ticker.${market}`],
        });
      }
    };

    init();

    return () => {
      const sm = SignalingManager.getInstance();
      sm.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
      sm.deRegisterCallback("ticker", `TICKER-${market}`);
      if (chartManagerRef.current) chartManagerRef.current.destroy();
    };
  }, [market, chartRef]);


  return (
    <>
      <div ref={chartRef} style={{ height: "520px", width: "100%", marginTop: 4 }}></div>
    </>
  );
}
