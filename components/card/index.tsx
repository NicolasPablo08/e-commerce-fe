import { LargeText, SubTitle } from "ui/typography";
import Link from "next/link";
type CardProps = {
  img: string;
  title: string;
  price: number;
  id?: string;
};
export function Card({ img, title, price, id }: CardProps) {
  return (
    <Link href={id ? `/item/${id}` : "/"}>
      <div className="w-[315px] h-[321px] border-[4px] border-black rounded-[8px] flex flex-col overflow-hidden cursor-pointer">
        <div>
          <img className="w-[100%] h-[237px]" src={img} alt={title} />
        </div>
        <div className="w-[100%] h-[84px] bg-[var(--fucsia-A200)] flex flex-row gap-[10px] overflow-hidden ">
          <div className="w-[55%] h-[100%] flex items-center justify-start pl-[5px] ">
            <LargeText>{title}</LargeText>
          </div>
          <div className="flex items-center justify-center">
            <SubTitle>${price}</SubTitle>
          </div>
        </div>
      </div>
    </Link>
  );
}
