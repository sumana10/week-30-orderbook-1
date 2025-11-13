"use client";

import { useState } from "react";
import { Markets } from "./Markets";
import Button from "./Button";

const activeStyles = "bg-gray-800 text-white rounded-md";
const inactiveStyles = "text-gray";

function DetailedCard() {
  const [activeTab, setActiveTab] = useState("spot");

  return (
    <div className="bg-darker w-full rounded-lg bg-baseBackgroundL1 px-5 py-3">
      <div className="flex gap-2 my-3.5 font-bold text-[14px]">
        <Button
          type="button"
          text="Spot"
          onClick={() => setActiveTab("spot")}
          className={`${activeTab === "spot" ? activeStyles : inactiveStyles} py-2 px-4 `}
        />
        <Button
          type="button"
          text="Futures"
          onClick={() => setActiveTab("futures")}
          className={`${activeTab === "futures" ? activeStyles : inactiveStyles} py-2 px-4`}
        />
        {/* <Button
          type="button"
          text="Lend"
          onClick={() => setActiveTab("lend")}
          className={`${activeTab === "lend" ? activeStyles : inactiveStyles} py-2 px-4`}
        /> */}
      </div>

      <Markets activeTab={activeTab} />
    </div>
  );
}

export default DetailedCard;
