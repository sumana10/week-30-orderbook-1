"use client";
import { useState } from "react";
import InputEl from "./InputEl";


export function SwapUI({ market }: { market: string }) {
    const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
    const [activeSubTab, setActiveSubTab] = useState<"limit" | "market" | "conditional">("limit");
    const [selectedOptions, setSelectedOptions] = useState<{ postOnly: boolean; ioc: boolean }>({
        postOnly: false,
        ioc: false,
    });

    const [price, setPrice] = useState("0.000000922");
    const [quantity, setQuantity] = useState("0");
    const [sliderPercent, setSliderPercent] = useState(0);

    const maxQuantity = 1000;
    const orderValue = (parseFloat(price) * parseFloat(quantity || "0")) || 0;

    const handleSliderChange = (value: number) => {
        setSliderPercent(value);
        const newQuantity = ((value / 100) * maxQuantity).toFixed(6);
        setQuantity(newQuantity);
    };

    const toggleOption = (option: "postOnly" | "ioc") => {
        setSelectedOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    return (
        <div className="bg-[#141519] rounded-lg p-5 w-full max-w-[350px] text-gray-300 font-sans">
            <div className="flex mb-5 rounded-lg overflow-hidden select-none border border-[#26272b]">
                <button
                    onClick={() => setActiveTab("buy")}
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === "buy"
                        ? "bg-[#1F3329] text-[#26B66B]"
                        : "bg-[#1A1B1F] text-[#6B7086] hover:bg-[#292B35]"
                        }`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setActiveTab("sell")}
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === "sell"
                        ? "bg-[#3A1F1F] text-[#ED6E5C]"
                        : "bg-[#1A1B1F] text-[#6B7086] hover:bg-[#292B35]"
                        }`}
                >
                    Sell
                </button>
            </div>

            <div className="flex items-center text-sm font-medium mb-5 text-[#6B7086] select-none">
                <button
                    onClick={() => setActiveSubTab("limit")}
                    className={`px-3 py-1 rounded-t-lg transition-colors ${activeSubTab === "limit"
                        ? "text-white"
                        : "hover:text-white"
                        }`}
                >
                    Limit
                </button>
                <button
                    onClick={() => setActiveSubTab("market")}
                    className={`px-3 py-1 rounded-t-lg transition-colors ${activeSubTab === "market"
                        ? "text-white"
                        : "hover:text-white"
                        }`}
                >
                    Market
                </button>
                <button
                    onClick={() => setActiveSubTab("conditional")}
                    className={`flex items-center px-3 py-1 rounded-t-lg bg-[#292B35] ml-auto text-white cursor-pointer select-none`}
                >
                    Conditional
                    <svg
                        className="ml-1 w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                    </svg>
                </button>
            </div>

            <div className="flex justify-between text-xs mb-3 text-[#6B7086] border-b border-[#26272b] pb-1">
                <span className="underline decoration-dashed cursor-help" title="Available balance for trading">
                    Balance
                </span>
                <span>-</span>
            </div>

            <InputEl
                label="Price"
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.000000922"
            />

            <InputEl
                label="Quantity"
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                    const val = e.target.value;
                    setQuantity(val);

                    const numVal = Number(val);
                    if (!isNaN(numVal) && numVal >= 0 && numVal <= maxQuantity) {
                        setSliderPercent((numVal / maxQuantity) * 100);
                    } else if (numVal > maxQuantity) {
                        setSliderPercent(100);
                    } else {
                        setSliderPercent(0);
                    }
                }}
                placeholder="0"
                min={0}
                max={maxQuantity}
            />

            <input
                type="range"
                min={0}
                max={100}
                value={sliderPercent}
                onChange={(e) => {
                    const val = Number(e.target.value);
                    setSliderPercent(val);
                    setQuantity(((val / 100) * maxQuantity).toFixed(6));
                }}
                className="w-full mb-5 accent-[#3A88FF]"
            />
            <div className="flex justify-between text-xs mb-5 text-[#6B7086]">
                <span>0</span>
                <span>100%</span>
            </div>

            <InputEl
                label="Order Value"
                id="ordervalue"
                type="text"
                value={orderValue.toFixed(6)}
                readOnly
                placeholder="0"
            />

            <button className="w-full py-3 mb-3 font-bold rounded-lg bg-white text-black hover:bg-[#efefef] transition duration-200">
                Sign up to trade
            </button>
            <button className="w-full py-3 mb-5 font-bold rounded-lg bg-[#1A1B1F] text-white hover:bg-[#292B35] transition duration-200">
                Sign in to trade
            </button>

            <div className="flex gap-5 text-xs text-[#6B7086]">
                <label className="flex items-center cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={selectedOptions.postOnly}
                        onChange={() => toggleOption("postOnly")}
                        className="mr-2 w-4 h-4 rounded border-gray-700 bg-[#1A1B1F] text-[#3A88FF] focus:ring-[#3A88FF]"
                    />
                    Post Only
                </label>
                <label className="flex items-center cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={selectedOptions.ioc}
                        onChange={() => toggleOption("ioc")}
                        className="mr-2 w-4 h-4 rounded border-gray-700 bg-[#1A1B1F] text-[#3A88FF] focus:ring-[#3A88FF]"
                    />
                    IOC
                </label>
            </div>
        </div>
    );
}
