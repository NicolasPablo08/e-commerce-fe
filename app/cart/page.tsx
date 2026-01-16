"use client";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { SubTitle, Body, BodyBold } from "ui/typography";
import { CartCard } from "components/card";
import { BlueButton } from "ui/buttons";
import { useGetProductsToCart } from "lib/hooks";
import { createPurchase } from "lib/api";

export default function CartPage() {
	const { data, error, isLoading } = useGetProductsToCart();
	const totalToPay = (data || []).reduce((total: number, product: any) => {
		return total + product.quantity * product.amount;
	}, 0);
	console.log(totalToPay);
	async function handlePurcharse() {
		try {
			const urlToPay = await createPurchase(data[0].cartId);
			// console.log(urlToPay.sandbox_init_point);

			window.location.href = urlToPay.sandbox_init_point;
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<div>
			<Header />
			<div className="px-[20px] pt-[60px] pb-[100px] flex flex-col gap-[20px]">
				<SubTitle>Carrito de compras</SubTitle>
				<div>
					{data ? (
						<div className="flex flex-col gap-[15px]">
							{data.map((p: any) => (
								<CartCard
									key={p.objectID}
									title={p.name}
									img={p.imageUrl}
									price={p.amount}
									quantity={p.quantity}
									id={p.objectID}
								/>
							))}
							<div className="flex flex-col gap-[10px] mt-[30px] items-end ">
								<BodyBold>Total: ${totalToPay}</BodyBold>
								<BlueButton onClick={handlePurcharse}>
									Finalizar Compra
								</BlueButton>
								<Body>
									Te redireccionaremos a mercadopago para finalizar tu compra
								</Body>
							</div>
						</div>
					) : (
						<Body>No tienes productos en el carrito</Body>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}
