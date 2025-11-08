import Link from "next/link";

const Footer = () =>{
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0b0c10] text-gray-400 mt-10 border-t border-[#1c1d22]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2 text-white text-lg font-semibold">
            Exchange
          </div>

          <div className="text-xs flex flex-wrap items-center gap-3 mt-3">
            <p className="font-medium text-white">
              Exchange © {year}
            </p>
            <Link
              href="https://support.backpack.exchange/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Legal
            </Link>
            <Link
              href="https://support.backpack.exchange/legal/general-legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-10 text-sm">
          {/* Company */}
          <div>
            <p className="text-white font-semibold mb-2">Company</p>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  href="https://learn.backpack.exchange/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://sugared-duckling-ec8.notion.site/7c1995182f4a491ba8a9501ee15cbd01?v=0604ca8976fa4e5e81c5494f7c95abc4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.backpack.exchange/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <p className="text-white font-semibold mb-2">Help & Support</p>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  href="https://learn.backpack.exchange/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="https://guide.backpack.exchange/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Guide
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.backpack.exchange/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.backpack.exchange/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="text-white font-semibold mb-2">Learn</p>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  href="https://learn.backpack.exchange/articles/what-is-a-solana-wallet-your-guide-to-getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Solana Wallet
                </Link>
              </li>
              <li>
                <Link
                  href="https://learn.backpack.exchange/articles/what-is-a-sui-wallet-everything-you-need-to-know-about-sui-wallets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Sui Wallet
                </Link>
              </li>
              <li>
                <Link
                  href="https://learn.backpack.exchange/articles/what-is-a-monad-wallet-your-guide-to-monad-testnet-and-backpack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Monad Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* Token Price */}
          <div>
            <p className="text-white font-semibold mb-2">Token Price</p>
            <ul className="flex flex-col gap-1.5">
              {[
                ["Solana", "solana"],
                ["Bitcoin", "bitcoin"],
                ["Ethereum", "ethereum"],
                ["Sui", "sui"],
                ["Monad", "monad"],
              ].map(([name, slug]) => (
                <li key={slug}>
                  <Link
                    href={`https://backpack.exchange/price/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300"
                  >
                    {name} Price
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex gap-4 items-start">
            {[
              ["https://x.com/backpack", "x-bw.svg", "X"],
              ["https://discord.com/invite/backpack", "discord-bw.svg", "Discord"],
              [
                "https://www.linkedin.com/company/backpackexchange/",
                "linkedin2.svg",
                "LinkedIn",
              ],
              ["https://www.reddit.com/r/Backpack_official/", "reddit2.svg", "Reddit"],
            ].map(([href, src, alt], i) => (
              <Link key={i} href={href} target="_blank" rel="noopener noreferrer">
                <img
                  alt={alt}
                  loading="lazy"
                  width="20"
                  height="20"
                  src={`https://backpack.exchange/${src}`}
                  className="opacity-80 hover:opacity-100 transition"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
