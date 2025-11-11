"use client";

import { useEffect, useState } from "react";
import { getDepth, getKlines, getTicker, getTrades } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    SignalingManager.getInstance().registerCallback("depth", (data: any) => {
      console.log("depth update:", data);

      setBids((prev = []) => {
        const next = [...prev];
        for (let i = 0; i < next.length; i++) {
          for (let j = 0; j < data.bids.length; j++) {
            if (next[i][0] === data.bids[j][0]) {
              next[i][1] = data.bids[j][1];
              if (Number(next[i][1]) === 0) next.splice(i, 1);
              break;
            }
          }
        }
        for (let j = 0; j < data.bids.length; j++) {
          if (
            Number(data.bids[j][1]) !== 0 &&
            !next.some(x => x[0] === data.bids[j][0])
          ) next.push(data.bids[j]);
        }
        next.sort((a, b) => Number(b[0]) - Number(a[0]));
        return [...next];
      });

      setAsks((prev = []) => {
        const next = [...prev];
        for (let i = 0; i < next.length; i++) {
          for (let j = 0; j < data.asks.length; j++) {
            if (next[i][0] === data.asks[j][0]) {
              next[i][1] = data.asks[j][1];
              if (Number(next[i][1]) === 0) next.splice(i, 1);
              break;
            }
          }
        }
        for (let j = 0; j < data.asks.length; j++) {
          if (
            Number(data.asks[j][1]) !== 0 &&
            !next.some(x => x[0] === data.asks[j][0])
          ) next.push(data.asks[j]);
        }
        next.sort((a, b) => Number(a[0]) - Number(b[0]));
        return [...next];
      });
    }, `DEPTH-${market}`);

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.${market}`],
    });

    getDepth(market).then(d => {
      setBids(d.bids.reverse());
      setAsks(d.asks);
    });

    getTicker(market).then(t => setPrice(t.lastPrice));
    getTrades(market).then(t => setPrice(t[0].price));

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
    };
  }, [market]);


  return <div>
    <TableHeader />
    {asks && <AskTable asks={asks} />}
    {price && <div>{price}</div>}
    {bids && <BidTable bids={bids} />}
  </div>
}

function TableHeader() {
  return <div className="flex justify-between text-xs">
    <div className="text-white">Price</div>
    <div className="text-slate-500">Size</div>
    <div className="text-slate-500">Total</div>
  </div>
}