"use client";
import { Title, LargeText } from "ui/typography";
import { FucsiaButton } from "@/ui/buttons";
import { useRouter } from "next/navigation";
export default function FailurePage() {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center gap-[30px] min-h-screen">
			<Title className="text-center">No pudimos procesar tu pago</Title>
			<LargeText className="text-center">
				Hubo un problema al intentar realizar el cobro con tu tarjeta o medio de
				pago. No te preocupes, no se ha realizado ningún cargo y tus productos
				siguen guardados en el carrito, puedes volver a intentar con otro medio
				de pago.
			</LargeText>
			<FucsiaButton className="w-[200px]" onClick={() => router.push("/cart")}>
				Volver al carrito
			</FucsiaButton>
		</div>
	);
}
