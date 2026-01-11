"use client";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { SubTitle, Body, BodyBold } from "ui/typography";
import { useState } from "react";
import { CartCard } from "components/card";
import { BlueButton } from "ui/buttons";
import { useGetProductsToCart } from "lib/hooks";

export default function CartPage() {
	const { data, error, isLoading } = useGetProductsToCart();
	const totalToPay = (data || []).reduce((total: number, product: any) => {
		return total + product.quantity * product.amount;
	}, 0);
	console.log(totalToPay);
	function handlePurcharse() {
		console.log("finalizar compra0", data[0].cartId);
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
								/>
							))}
							<div className="flex flex-col gap-[10px] mt-[30px] items-end ">
								<BodyBold>Total: ${totalToPay}</BodyBold>
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
