import Image from "next/image";
import { Markets } from "./components/Markets";
import ImageCarousel from "./components/ImageCarousel";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#0b0c10] text-white">
      <section className="w-full max-w-7xl px-6 mt-10">
        <ImageCarousel />
      </section>
      <section className="w-full max-w-7xl px-6 mt-16 mb-20">
        <Markets />
      </section>
    </main>
  );
}
