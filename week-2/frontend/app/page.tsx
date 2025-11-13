import Image from "next/image";
import { Markets } from "./components/Markets";
import ImageCarousel from "./components/ImageCarousel";
import Card from "./components/Card";
import ParentCard from "./components/ParentCard";


export const coins = [
  { "name": "APR", "value": "0.45934", "change": "+75.95%", "image": "/token/apr.webp" },
  { "name": "MET", "value": "0.3653", "change": "+2.93%", "image": "/token/met.webp" },
  { "name": "PIPE", "value": "0.07977", "change": "-0.52%", "image": "/token/pipe.webp" },
  { "name": "BNB", "value": "998.90", "change": "+1.13%", "image": "/token/bnb.webp" },
  { "name": "2Z", "value": "0.19835", "change": "+4.78%", "image": "/token/2z.webp" }
];
export const topGainers = [
  { "name": "BLUE", "value": "0.06823", "change": "+15.04%", "image": "/token/blue.webp" },
  { "name": "MET", "value": "0.4602", "change": "+6.50%", "image": "/token/met.webp" },
  { "name": "ES", "value": "0.10962", "change": "+6.00%", "image": "/token/es.webp" },
  { "name": "RAY", "value": "1.56", "change": "+2.54%", "image": "/token/ray.webp" },
  { "name": "SWTCH", "value": "0.07036", "change": "+2.05%", "image": "/token/swtch.webp" }
];
export const popular = [
  { "name": "SOL", "value": "162.92", "change": "+3.95%", "image": "/token/sol.webp" },
  { "name": "ETH", "value": "3526.61", "change": "+4.75%", "image": "/token/eth.webp" },
  { "name": "USDT", "value": "0.9999", "change": "+0.01%", "image": "/token/usdt.webp" },
  { "name": "BTC", "value": "103701.50", "change": "+1.82%", "image": "/token/btc.webp" },
  { "name": "SUI", "value": "2.14", "change": "+2.95%", "image": "/token/sui.webp" }
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
        <ParentCard />
      </section>
    </main>
  );
}
