type ButtonsProps = {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit";
};
export function DefaultButton({
	children,
	className,
	onClick,
	type,
}: ButtonsProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`text-white w-[163px] h-[37px] rounded-[8px] font-[700] font-[inter] block ${className}`}
		>
			{children}
		</button>
	);
}

export function BlueButton({
	children,
	className,
	onClick,
	type,
}: ButtonsProps) {
	return (
		<DefaultButton
			type={type}
			onClick={onClick}
			className={`bg-[var(--azul-800)] ${className}`}
		>
			{children}
		</DefaultButton>
	);
}
export function YellowButton({
	children,
	className,
	onClick,
	type,
}: ButtonsProps) {
	return (
		<DefaultButton
			type={type}
			onClick={onClick}
			className={`bg-[var(--amarillo-700)] ${className}`}
		>
			{children}
		</DefaultButton>
	);
}
export function FucsiaButton({
	children,
	className,
	onClick,
	type,
}: ButtonsProps) {
	return (
		<DefaultButton
			type={type}
			onClick={onClick}
			className={`bg-[var(--fucsia-A200)] ${className}`}
		>
			{children}
		</DefaultButton>
	);
}
