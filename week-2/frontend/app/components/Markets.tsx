"use client";

import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTickers } from "../utils/httpClient";
import { useRouter } from "next/navigation";
import { LineChart, Line, ResponsiveContainer, YAxis, AreaChart, Area } from "recharts";

export const Markets = ({ activeTab }: { activeTab: string }) => {
  const [tickers, setTickers] = useState<Ticker[]>();

  useEffect(() => {
    getTickers().then((m) => setTickers(m));
  }, []);
  const filteredTickers = tickers
    ? tickers.filter((t) => {
      const isPerp = t.symbol.toUpperCase().includes("PERP");

      if (activeTab === "spot") return !isPerp;
      if (activeTab === "futures") return isPerp;

      return true;
    })
    : [];


  return (
    <div className="flex flex-col flex-1 max-w-[1280px] w-full">
      <div className="flex flex-col min-w-[700px] flex-1 w-full">
        <div className="flex flex-col w-full rounded-lg bg-baseBackgroundL1 px-5 py-3">
          <table className="w-full table-auto">
            <MarketHeader />
            {/* {tickers?.map((m) => <MarketRow market={m} />)} */}
            {filteredTickers?.map((m) => <MarketRow market={m} />)}
          </table>
        </div>
      </div>
    </div>
  );
};

function MarketRow({ market }: { market: Ticker }) {
  const router = useRouter();
  const parts = market.symbol.split("_");
  const base = parts[0].toLowerCase(); // use exactly what we already have
  const change = Number(market.priceChangePercent);

  const imgSrc = `https://backpack.exchange/_next/image?url=%2Fcoins%2F${base}.png&w=64&q=95`;

  console.log("market", market);


  const raw = [
    Number(market.firstPrice),
    (Number(market.firstPrice) + Number(market.low)) / 2,
    Number(market.low),
    (Number(market.low) + Number(market.high)) / 2,
    Number(market.high),
    (Number(market.high) + Number(market.lastPrice)) / 2,
    Number(market.lastPrice),
  ];

  const min = Math.min(...raw);
  const max = Math.max(...raw);

  const normalizedData = raw.map((v) => ({
    value: 19 - ((v - min) / (max - min)) * 18,
  }));

  const isTrendUp =
    normalizedData[normalizedData.length - 1].value >
    normalizedData[0].value;

  return (
    <tr className="cursor-pointer border-t border-baseBorderLight hover:bg-white/7 w-full" onClick={() => router.push(`/trade/${market.symbol}`)}>
      <td className="px-1 py-3">
        <div className="flex shrink">
          <div className="flex items-center undefined">
            <div
              className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
              style={{ width: "40px", height: "40px" }}
            >
              <div className="relative">

                <img
                  alt={market.symbol}
                  src={imgSrc}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"; // default fallback
                  }}
                  width="40"
                  height="40"
                  loading="lazy"
                />


              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
                {(() => {
                  const parts = market.symbol.split("_");
                  const base = parts[0];
                  const middle = parts[1];
                  const suffix = parts[2];

                  if (suffix === "PERP") {
                    return `${base.toUpperCase()}-PERP`;
                  }

                  return `${base.toUpperCase()}`;
                })()}
              </p>
              <div className="flex items-center justify-start flex-row gap-2">
                <p className="flex-medium text-left text-xs leading-5 text-baseTextMedEmphasis">
                  {(() => {
                    const parts = market.symbol.split("_");
                    const base = parts[0];
                    const middle = parts[1];
                    const suffix = parts[2];

                    if (suffix === "PERP") {
                      return `${base.toUpperCase()}-PERP`;
                    }

                    return `${base.toUpperCase()}/${middle.toUpperCase()}`;
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.lastPrice}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.high}</p>
      </td>
      <td className="px-1 py-3">
        <p className="text-base font-medium tabular-nums">{market.volume}</p>
      </td>
      <td className="px-1 py-3">

        <p
          className={`text-base font-medium tabular-nums ${change > 0 ? "text-green-500" : "text-red-500"
            }`}
        >
          {change.toFixed(3)} %
        </p>

      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className="flex justify-end items-center">
          <div className="w-[100px] h-[20px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={normalizedData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isTrendUp ? "#00c278" : "#ff4d4f"}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={isTrendUp ? "#00c278" : "#ff4d4f"}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>

                <Area
                  type="monotoneX"
                  dataKey="value"
                  stroke={isTrendUp ? "#00c278" : "#ff4d4f"}
                  strokeWidth={1.5}
                  fill="url(#colorValue)"
                  dot={false}
                  isAnimationActive={false}
                />

                <YAxis hide domain={[0, 20]} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </td>



    </tr>
  );
}

function MarketHeader() {
  return (
    <thead>
      <tr className="">
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Name<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Price<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Market Cap <span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            24h Volume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-down h-4 w-4"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            24h Change<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis">
          <div className="flex justify-end items-center gap-1 cursor-pointer select-none">
            Last 7 days<span className="w-[16px]"></span>
          </div>
        </th>
      </tr>
    </thead>
  );
}