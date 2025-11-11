"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

const dotStyle =
  "w-2.5 h-2.5 bg-white rounded-full inline-block opacity-35 shadow-md cursor-pointer";

const slides = [
  {
    image: "/hero/home-banner-1.webp",
    linkText: "View Quests",
    heading: "Trade more. Earn more.",
    description: "Earn daily rewards that scale with exchange volume.",
  },
  {
    image: "/hero/home-banner-2.webp",
    linkText: "Lend SOL",
    heading: "Earn 8.02% APY on your SOL",
    description:
      "Lend SOL to earn staking yield + lending yield, and use as collateral.",
  },
  {
    image: "/hero/home-banner-3.webp",
    linkText: "Lend USD",
    heading: "Get 5.36% APY on USD",
    description: "Access boosted yields on your USD and use as collateral.",
  },
  {
    image: "/hero/home-banner-4.webp",
    linkText: "Trade USDT",
    heading: "Trade USDT",
    description:
      "Convert to USD with 0 fees and start trading instantly on Backpack!",
  },
  {
    image: "/hero/home-banner-5.webp",
    linkText: "Manage Referrals",
    heading: "Refer and Earn",
    description: "Refer friends and earn a percentage of their trading fees.",
  },
  {
    image: "/hero/home-banner-6.webp",
    heading: "Wire Transfers are Live",
    description: "Deposit and withdraw USD with zero fees.",
  },
];

const ImageCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnInteraction: false, delay: 3500 }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const onDotButtonClick = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div ref={emblaRef} className="relative overflow-hidden w-full rounded-2xl">
      {/* Slides */}
      <div className="flex w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0 flex-grow-0 basis-full rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10c5] via-[#0b0c10a0] to-transparent mix-blend-multiply"></div>
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-[320px] md:h-[380px] object-cover rounded-2xl brightness-105 contrast-105"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-start z-10 text-left pl-10 md:pl-20 max-w-2xl">
              <h2 className="text-[36px] font-extrabold leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">
                {slide.heading}
              </h2>



              <p className="mt-3 text-gray-400 text-base md:text-xl font-medium max-w-md">
                {slide.description}
              </p>

              {slide.linkText && (
                <Link
                  href="#"
                  className="inline-block mt-5 px-6 py-3 rounded-xl bg-white text-zinc-900 text-sm md:text-base font-semibold hover:bg-gray-200 transition"
                >
                  {slide.linkText}
                </Link>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Arrows */}
      <Button
        icon={<ChevronLeft size={28} />}
        type="button"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-90"
      />
      <Button
        icon={<ChevronRight size={28} />}
        type="button"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-90"
      />

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center">
        <ul className="flex gap-2">
          {scrollSnaps.map((_, i) => (
            <li
              key={i}
              className={`${dotStyle} ${selectedIndex === i ? "opacity-100" : ""}`}
              onClick={() => onDotButtonClick(i)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default ImageCarousel