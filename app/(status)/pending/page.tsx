"use client";
import { Title, LargeText } from "ui/typography";
import { YellowButton } from "@/ui/buttons";
import { useRouter } from "next/navigation";
export default function PendingPage() {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center gap-[30px] min-h-screen">
			<Title className="text-center">
				Tu pago está pendiente de acreditación
			</Title>
			<LargeText className="text-center">
				Estamos esperando que el medio de pago nos confirme la transacción. Esto
				puede demorar desde unos minutos hasta 48 horas hábiles dependiendo del
				método elegido.
			</LargeText>
			<YellowButton className="w-[200px]" onClick={() => router.push("/")}>
				Volver al e-commerce
			</YellowButton>
		</div>
	);
}
