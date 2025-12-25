import ShoppingCartIcon from "./shopping-cart-icon.svg";
type EditShoppingCartIconProps = {
	className?: string;
};
export function EditShoppingCartIcon({ className }: EditShoppingCartIconProps) {
	return <ShoppingCartIcon className={` ${className}`} />;
}
export { ShoppingCartIcon };
