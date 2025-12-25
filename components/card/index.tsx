import { LargeText, SubTitle } from "ui/typography";
type CardProps = {
	img: string;
	title: string;
	price: number;
	id?: string;
};
export function Card({ img, title, price, id }: CardProps) {
	return (
		<div className="w-[315px] h-[321px] border-[4px] border-black rounded-[8px] flex flex-col overflow-hidden">
			<div>
				<img className="w-[100%] h-[237px]" src={img} alt={title} />
			</div>
			<div className="w-[100%] h-[84px] bg-[var(--fucsia-A200)] flex flex-row">
				<div className="w-[60%] h-[100%] flex items-center justify-center pl-[5px] ">
					<LargeText>{title}</LargeText>
				</div>
				<div className="flex items-center justify-center">
					<SubTitle>$ {price}</SubTitle>
				</div>
			</div>
		</div>
	);
}
