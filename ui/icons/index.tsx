import InstaFooterSVG from "./instagram_footer.svg";
import TwitterFooterSVG from "./twitter_footer.svg";
import MenuButtonSVG from "./menu_header.svg";
import ShoppingCartSVG from "./shopping-cart-icon.svg";
import LinkedinSVG from "./linkedin-icon.svg";

export function ShoppingCartIcon({ className }: { className?: string }) {
	return <ShoppingCartSVG className={` ${className}`} />;
}

export function InstagramIcon({ className }: { className?: string }) {
	return <InstaFooterSVG className={`w-[19px] h-[23px] ${className}`} />;
}
export function TwitterIcon({ className }: { className?: string }) {
	return <TwitterFooterSVG className={`w-[19px] h-[23px]  ${className}`} />;
}
export function LinkedinIcon({ className }: { className?: string }) {
	return (
		<LinkedinSVG
			className={`w-[17px] h-[20px] m-[0px] p-[0px] pb-[2px] text-[black] bg-[white] ${className}`}
		/>
	);
}

export function MenuButtonIcon({ className }: { className?: string }) {
	return <MenuButtonSVG className={`w-[52px] h-[40px] ${className}`} />;
}
