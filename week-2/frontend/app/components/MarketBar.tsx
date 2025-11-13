"use client";
import { useEffect, useState } from "react";
import type { Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import { SignalingManager } from "../utils/SignalingManager";
import { ChevronDown } from "lucide-react";

const MarketBar = ({ market }: { market: string }) => {
    const [ticker, setTicker] = useState<Ticker | null>(null);

    useEffect(() => {
        getTicker(market).then(setTicker);
        SignalingManager.getInstance().registerCallback(
            "ticker",
            (data: Partial<Ticker>) =>
                setTicker((prevTicker) => ({
                    firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
                    high: data?.high ?? prevTicker?.high ?? "",
                    lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
                    low: data?.low ?? prevTicker?.low ?? "",
                    priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
                    priceChangePercent:
                        data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
                    quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
                    symbol: data?.symbol ?? prevTicker?.symbol ?? "",
                    trades: data?.trades ?? prevTicker?.trades ?? "",
                    volume: data?.volume ?? prevTicker?.volume ?? "",
                })),
            `TICKER-${market}`
        );
        SignalingManager.getInstance().sendMessage({
            method: "SUBSCRIBE",
            params: [`ticker.${market}`],
        });

        return () => {
            SignalingManager.getInstance().deRegisterCallback("ticker", `TICKER-${market}`);
            SignalingManager.getInstance().sendMessage({
                method: "UNSUBSCRIBE",
                params: [`ticker.${market}`],
            });
        };
    }, [market]);

    return (
        <>
            <div className="bg-darker h-20 flex gap-8 items-center px-4 rounded-lg font-semibold overflow-x-scroll no-scrollbar lg:w-270">
                <button className="flex bg-dark py-1.5 px-2 rounded-xl items-center shrink-0">
                    <img
                        className="w-8 rounded-full"
                        src="/token/sol.webp"
                        alt="coin"
                    />
                    <span className="pl-2">{market.split("_")[0]}</span>
                    <span className="text-gray">/{market.split("_")[1]}</span>
                    <ChevronDown color="#89919F" className="pl-2" size={32} />
                </button>

                <div>
                    <p className={`font-bold text-[18px] ${Number(ticker?.priceChange) > 0 ? "text-green-400" : "text-red-500"}`}>
                        {ticker?.lastPrice}
                    </p>
                    <p className="text-[14px]">${ticker?.lastPrice}</p>
                </div>

                <div>
                    <p className="text-gray text-xs">24H Change</p>
                    <p className={`text-[14px] ${Number(ticker?.priceChange) > 0 ? "text-green-500" : "text-red-500"}`}>
                        <span>{Number(ticker?.priceChange) > 0 ? "+" : ""}{ticker?.priceChange}</span>
                        <span className="pl-2">{Number(ticker?.priceChangePercent)?.toFixed(2)}%</span>
                    </p>
                </div>

                <div>
                    <p className="text-gray text-xs">24H High</p>
                    <p className="text-[14px]">{ticker?.high}</p>
                </div>

                <div>
                    <p className="text-gray text-xs">24H Low</p>
                    <p className="text-[14px]">{ticker?.low}</p>
                </div>

                <div>
                    <p className="text-gray text-xs text-nowrap">24H Volume (USD)</p>
                    <p className="text-[14px]">{ticker?.quoteVolume}</p>
                </div>
            </div>
        </>
    );
}

export default MarketBar;
