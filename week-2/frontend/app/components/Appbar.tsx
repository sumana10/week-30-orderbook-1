"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PrimaryButton, SuccessButton } from "./core/Button";
import Button from "./Button";
import NavbarDropdown from "./NavbarDropdown";

const Appbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isMoreActive = showDropdown;

    const isActive = (path: string) => pathname.startsWith(path);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="text-white border-b border-slate-800">
            <div className="flex justify-between items-center p-2">
                <div className="flex">
                    <div
                        className="text-xl pl-4 flex flex-col justify-center cursor-pointer text-white"
                        onClick={() => router.push("/")}
                    >
                        Exchange
                    </div>

                    {[
                        { href: "/trade/SOL_USDC", label: "Spot" },
                        { href: "/trade/SOL_USDC", label: "Futures" },
                        { href: "/trade/SOL_USDC", label: "Lend" },
                    ].map((item) => (
                        <div key={item.href} className="text-sm pt-1 pl-8 flex flex-col justify-center">
                            <Link
                                href={item.href}
                                className={`hover:text-gray-300 ${isActive(item.href) ? "text-gray-300" : "text-slate-500"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}

                    {/* Dropdown */}
                    <div ref={modalRef} className="relative pl-8 flex flex-col justify-center mt-[4px]">
                        <Button
                            className={`text-sm flex flex-row-reverse items-center gap-1 hover:text-gray-300 ${isMoreActive ? "text-gray-300" : "text-slate-500"
                                }`}
                            text="More"
                            icon={
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
                                />
                            }
                            onClick={() => setShowDropdown((prev) => !prev)}
                        />
                        {showDropdown && (
                            <div className="absolute top-full mt-2 bg-slate-900 rounded-md shadow-lg p-2">
                                <NavbarDropdown />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex p-2 mr-2">
                    <SuccessButton>Deposit</SuccessButton>
                    <PrimaryButton>Withdraw</PrimaryButton>
                </div>
            </div>
        </div>
    );
};
export default Appbar;
