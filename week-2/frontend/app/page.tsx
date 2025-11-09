import Image from "next/image";
import { Markets } from "./components/Markets";
import ImageCarousel from "./components/ImageCarousel";
import Card from "./components/Card";


export const coins = [
    { "name": "APR", "value": "0.45934", "change": "+75.95%", "image": "apr.png" },
    { "name": "MET", "value": "0.3653", "change": "+2.93%", "image": "met.png" },
    { "name": "PIPE", "value": "0.07977", "change": "-0.52%", "image": "pipe.png" },
    { "name": "BNB", "value": "998.90", "change": "+1.13%", "image": "bnb.png" },
    { "name": "2Z", "value": "0.19835", "change": "+4.78%", "image": "2z.png" }
  ];
  export const topGainers = [
    { "name": "APR", "value": "0.45934", "change": "+75.95%", "image": "apr.png" },
    { "name": "0G", "value": "1.64", "change": "+19.95%", "image": "0g.png" },
    { "name": "STRK", "value": "0.1507", "change": "+15.30%", "image": "strk.png" },
    { "name": "UNI", "value": "6.54", "change": "+9.05%", "image": "uni.png" },
    { "name": "KMNO", "value": "0.06309", "change": "+8.87%", "image": "kmno.png" }
  ];
  export const popular = [
    { "name": "SOL", "value": "162.92", "change": "+3.95%", "image": "sol.png" },
    { "name": "ETH", "value": "3526.61", "change": "+4.75%", "image": "eth.png" },
    { "name": "USDT", "value": "0.9999", "change": "+0.01%", "image": "usdt.png" },
    { "name": "BTC", "value": "103701.50", "change": "+1.82%", "image": "btc.png" },
    { "name": "SUI", "value": "2.14", "change": "+2.95%", "image": "sui.png" }
  ]

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#0b0c10] text-white">
      <section className="w-full max-w-7xl px-6 mt-10">
        <ImageCarousel />
      </section>
      <section className="w-full max-w-7xl px-6 mt-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
    <Card title="New" coins={coins} />
    <Card title="Top Gainers" coins={topGainers} />
    <Card title="Popular" coins={popular} />
  </div>
</section>

      <section className="w-full max-w-7xl px-6 mt-16 mb-20">
        <Markets />
      </section>
    </main>
  );
}
