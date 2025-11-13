import Image from "next/image";

interface CoinProps {
  name: string;
  value: string;
  change: string;
  image: string;
}

interface CardProps {
  title?: string;
  coins?: CoinProps[];
  className?: string;
}


const Card = ({ title, coins = [], className = "" }: CardProps) => {
  return (
    <div className={`${className} bg-[#111214] border border-[#1e1f23]
 rounded-lg w-full py-3`}>
      {title && <p className="text-md font-bold pt-1.5 pb-2 px-4">{title}</p>}
      {coins.map((item) => (
        <div
          key={item.name}
          className="flex py-[7px] font-bold hover:bg-dark px-4 text-[13px] lg:text-[15px] tracking-wide cursor-pointer"
        >
          <div className="flex-1 flex items-center">
            <Image
              width={24}
              height={24}
              src={item.image}
              loading="lazy"
              alt={`${item.name} logo`}
              className="object-cover rounded-full"
            />
            <p className="pl-3">{item.name}</p>
          </div>
          <div className="flex justify-between w-[60%] text-right">
            <p className="w-[50%]">${parseFloat(item.value).toLocaleString()}</p>
            <p
              className={`${item.change.startsWith("-")
                ? "text-red-500"
                : "text-green-400"
                } w-[50%]`}
            >
              {item.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
