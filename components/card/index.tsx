import {
	LargeText,
	SubTitle,
	Body,
	Title,
	BodyBold,
	Tiny,
} from "ui/typography";
import { useRouter } from "next/navigation";
import { EditButton } from "ui/buttons";
import { useMe } from "lib/hooks";
import { Message } from "ui/message";
import { DeleteIcon } from "ui/icons";
import Link from "next/link";
import { useState } from "react";
import { deleteProductFromCart, addProductToCart } from "lib/api";
type CardProps = {
	img: string;
	title: string;
	price: number;
	id?: string;
	description?: string;
	stock?: number;
	quantity?: number;
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

export function ExtendedCard({
	img,
	title,
	price,
	id,
	description,
	stock,
}: CardProps) {
	const [message, setMessage] = useState("");
	const [showMessage, setShowMessage] = useState(false);
	const router = useRouter();
	const data = useMe();
	const isLoggedIn = data.data;

	async function handleBuy(e: any) {
		e.preventDefault();
		//verificar si estoy logueado, si no redirigir al login
		if (!isLoggedIn) {
			setMessage("Debes iniciar sesión");
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
				router.push("/signin");
			}, 3000);
			return;
		}
		//si estoy logueado verificar si tengo mis datos personales completos
		if (!data.data.name || !data.data.lastName || !data.data.address) {
			setMessage("Debes completar tus datos personales");
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
				router.push("/profile");
			}, 3000);
			return;
		}
		//si ambos pasos anterirores son correctos proceder a agregar al carro
		const quantity = e.target.quantity.value;
		const res = await addProductToCart(id as string, quantity, title);
		console.log("Comprar producto con id:", id, "cantidad:", quantity);
		if (res.status === 200) {
			setMessage("Producto agregado al carrito");
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
			}, 3000);
		} else {
			setMessage(res.message);
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
			}, 3000);
		}
	}
	return (
		<div>
			<div className="w-[315px] flex flex-col gap-[20px] overflow-hidden">
				<div>
					<img
						className="w-[100%] h-[237px] border-[1px]"
						src={img}
						alt={title}
					/>
				</div>
				<div className="w-[100%] flex flex-col gap-[15px] overflow-hidden ">
					<div className="flex  justify-start w-[280px]">
						<SubTitle>{title}</SubTitle>
					</div>
					<div className="flex items-center justify-start">
						<Title>${price}</Title>
					</div>
					<form className="flex flex-col gap-[10px]" onSubmit={handleBuy}>
						<label htmlFor="">
							<Body>Cantidad</Body>
							<input
								name="quantity"
								type="number"
								min="1"
								max={stock}
								className="border-[1px] border-black rounded-[4px] w-[80px] h-[40px] text-[20px] text-center"
								defaultValue={1}
							/>
						</label>
						{stock === 0 ? (
							<Body className="text-[red]">No hay stock disponible</Body>
						) : (
							<Body className="text-[green]">Stock disponible: {stock}</Body>
						)}
						<EditButton
							disabled={stock === 0 ? true : false}
							className={`w-[100%] h-[60px] text-black ${
								stock === 0
									? "bg-[var(--gray-300)]"
									: "bg-[var(--celeste-A100)]"
							}`}
							type="submit"
						>
							Agregar al carrito
						</EditButton>
					</form>
					<div className="w-[100%] flex justify-start ">
						<Body>{description}</Body>
					</div>
				</div>
			</div>
			{showMessage && <Message>{message}</Message>}
		</div>
	);
}

export function CartCard({ img, title, id, price, quantity }: CardProps) {
	const priceTotal = price * quantity;
	async function deleteItem(id: string) {
		await deleteProductFromCart(id);
		// console.log("item eliminado", id);
	}
	return (
		<div className="py-2 px-2 w-[315px] h-[126px] border-[4px] border-black rounded-[8px] overflow-hidden cursor-pointer">
			<div className="w-[100%] h-[100%] flex flex-row">
				<div className="h-[100%] flex justify-center items-center">
					<img
						className="w-[130px] h-[100px] border-[1px]"
						src={img}
						alt={title}
					/>
				</div>
				<div className="w-[100%] h-[100%] bg-[var(--fucsia-A200)] flex flex-col gap-[10px] overflow-hidden ">
					<div className="w-[100%] h-[60%] flex items-center justify-start px-[5px] ">
						<BodyBold>{title}</BodyBold>
					</div>
					<div className="flex flex-row items-center justify-start px-[5px] gap-[10px] ">
						<Tiny>Cant: {quantity}</Tiny>
						<Tiny>Total: ${priceTotal}</Tiny>
						<button
							className="text-[red]"
							onClick={() => deleteItem(id as string)}
						>
							<DeleteIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
