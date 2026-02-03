"use client";
import { Title, LargeText } from "ui/typography";
import { BlueButton } from "@/ui/buttons";
import { useRouter } from "next/navigation";
export default function SuccessPage() {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center gap-[30px] min-h-screen">
			<Title className="text-center">Gracias por tu compra!!!</Title>
			<LargeText className="text-center">
				Hemos recibido tu pago correctamente. En breve recibirás un correo
				electrónico con el detalle de tu pedido.
			</LargeText>
			<BlueButton className="w-[200px]" onClick={() => router.push("/")}>
				Volver al e-commerce
			</BlueButton>
		</div>
	);
}
