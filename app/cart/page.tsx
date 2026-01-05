"use client";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { SubTitle, Body, BodyBold } from "ui/typography";
import { useState } from "react";
import { CartCard } from "components/card";
import { BlueButton } from "ui/buttons";
export default function CartPage() {
	const [productsForShipping, setProductsForShipping] = useState(true);
	const products = ["jean", "campera", "blusa"];
	const total = "1000";
	function handlePurcharse() {
		console.log("enlace a mercadopago");
	}
	return (
		<div>
			<Header />
			<div className="px-[20px] pt-[60px] pb-[100px] flex flex-col gap-[20px]">
				<SubTitle>Carrito de compras</SubTitle>
				<div>
					{productsForShipping ? (
						<div className="flex flex-col gap-[15px]">
							{products.map((p) => (
								<CartCard title={p} />
							))}
							<div className="flex flex-col gap-[10px] mt-[30px] items-end ">
								<BodyBold>Total: ${total}</BodyBold>
								<BlueButton onClick={handlePurcharse}>
									Finalizar Compra
								</BlueButton>
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
