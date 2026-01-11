import { LargeText } from "ui/typography";
export function Message({ children }: any) {
	return (
		<div
			className={
				"w-[300px] h-[200px] border-[2px] border-black bg-[white] rounded-[8px] flex items-center justify-center fixed text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
			}
		>
			<LargeText>{children}</LargeText>
		</div>
	);
}
