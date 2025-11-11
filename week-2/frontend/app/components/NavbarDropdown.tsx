import {
  BookOpen,
  ChartCandlestick,
  ChartLine,
  CircleQuestionMark,
  Compass,
  Download,
  ExternalLink,
  Handshake,
  Landmark,
  Newspaper,
} from "lucide-react";
import Link from "next/link";

const listItems = [
  {
    name: "Stats",
    description: "Backpack stats",
    icon: <ChartLine size={17} className="lucide lucide-chart-line text-[#BEE05A]" />,
    link: "https://backpack.exchange/stats",
  },

  {
    name: "Support",
    description: "Find answers & get help",
    icon: <CircleQuestionMark size={17} className="lucide lucide-circle-question-mark text-[#7ACCC7]" />,
    linkIcon: <ExternalLink size={15} />,
    link: "https://support.backpack.exchange/",
  },
  {
    name: "Guide",
    description: "Backpack trading docs",
    icon: <Compass size={17} className="lucide lucide-compass text-[#F88484]" />,
    linkIcon: <ExternalLink size={15} />,
    link: "https://guide.backpack.exchange/",
  },
  {
    name: "Market Info",
    description: "Compare funding rates",
    icon: <ChartCandlestick size={17} className="lucide lucide-chart-candlestick text-[#5596F6]" />,
    link: "https://backpack.exchange/market-info/funding-comparison",
  },
  {
    name: "Documentation",
    description: "API documentation",
    icon: <BookOpen size={17} className="lucide lucide-book-open text-[#DA8BE7]" />,
    linkIcon: <ExternalLink size={15} />,
    link: "https://docs.backpack.exchange/",
  },
  {
    name: "Download",
    description: "Apps and browser extensions",
    icon: <Download size={17} className="lucide lucide-monitor-smartphone text-[#57AEFF]" />,
    linkIcon: <ExternalLink size={15} />,
    link: "https://backpack.app/download?shortlink=wao&c=Download_BackpackExchange&pid=Backpack%20Owned%20Site&af_xp=social&source_caller=ui",
  },
  {
    name: "Reserves",
    description: "Proof of reserve",
    icon: <Landmark size={17} className="lucide lucide-landmark text-[#75DD7A]" />,
    link: "https://learn.backpack.exchange/",
  },
  {
    name: "Affiliate Program",
    description: "Referrals and more",
    icon: <Handshake size={17} className="lucide lucide-handshake text-[#BCAAA4]" />,
    linkIcon: <ExternalLink size={15} />,
    link: "https://backpack.exchange/affiliates",
  },
  {
    name: "News",
    description: "Buy limited-edition drops",
    icon: <Newspaper size={17} className="lucide lucide-newspaper text-[#A3B5CF]" />,
    linkIcon: <ExternalLink size={15} />,
    link: "https://learn.backpack.exchange/blog",
  },
];

const NavbarDropdown = () => {
  return (
    <>
      <ul className="z-20 shadow-2xl shadow-black bg-[#0b0c10] border border-[#1c1d22] p-5 rounded-xl absolute top-10 left-full -ml-15 grid grid-cols-4 gap-x-5 gap-y-4 w-[46rem]">
        {listItems.map((item, i) => {
          return (
            <Link href={item.link} key={i} target="_blank">
              <li className="flex gap-4 w-full hover:bg-[#1a1b20] px-5 py-4 rounded-lg transition-colors duration-150">
                <div className="pt-1">{item.icon}</div>
                <div>
                  <p className="text-white flex gap-2 items-center text-[0.95rem] font-medium">
                    {item.name}
                    {item.linkIcon && (
                      <span className="text-gray-400 pt-0.5">{item.linkIcon}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 pt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}

        {/* Discord */}
        <div className="row-start-1 col-start-4 row-span-3">
          <Link href="https://discord.com/invite/backpack" target="_blank">
            <li className="flex gap-4 w-full hover:bg-[#1a1b20] px-5 py-4 rounded-lg h-full transition-colors duration-150">
              <div className="pt-1">
                <img
                  src="https://backpack.exchange/discord-bw.svg"
                  alt="discord logo"
                  className="w-5"
                />
              </div>
              <div>
                <p className="text-white flex gap-2 items-center text-[0.95rem] font-medium">
                  Discord
                  <span className="text-gray-400 pt-0.5">
                    <ExternalLink size={15} />
                  </span>
                </p>
                <p className="text-xs text-gray-400 pt-1 leading-snug">
                  Join our Discord community
                </p>
              </div>
            </li>
          </Link>
        </div>
      </ul>

    </>
  );
}

export default NavbarDropdown;
