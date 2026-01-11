"use client";
import { SubTitle } from "ui/typography";
import { YellowButton, FucsiaButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useEffect, useState } from "react";
import { useMe } from "lib/hooks";
import { Message } from "ui/message";
import { savedProfileData } from "lib/api";
import { useRouter } from "next/navigation";

export default function Profile() {
	const router = useRouter();
	const [message, setMessage] = useState("");
	const [showMessage, setShowMessage] = useState(false);
	const data = useMe();
	const me = data.data;
	const [misDatos, setMisDatos] = useState({
		name: "",
		lastName: "",
		address: "",
	});
	useEffect(() => {
		if (me) {
			setMisDatos({
				name: me.name || "",
				lastName: me.lastName || "",
				address: me.address || "",
			});
		}
	}, [me]); // Solo se ejecuta cuando 'me' cambia
	async function handleForm(e: any) {
		e.preventDefault();
		if (!misDatos.name || !misDatos.lastName || !misDatos.address) {
			setMessage("Debes completar todos tus datos");
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
			}, 3000);
			return;
		}
		const response = await savedProfileData(
			misDatos.name,
			misDatos.lastName,
			misDatos.address
		);

		if (response.message === "User updated") {
			setMessage("Tus datos fueron actualizados");
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
			}, 3000);
		} else {
			setMessage(response.message);
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
				setMessage("");
			}, 3000);
		}
	}
	return (
		<div>
			<Header />
			<div className="pt-[30px] pb-[66px] items-center flex flex-col  ">
				<form onSubmit={handleForm} className="flex flex-col gap-[40px]">
					<div>
						<SubTitle>Perfil</SubTitle>
					</div>
					<div className="flex flex-col gap-[10px] items-center">
						<TextField
							name="name"
							type="text"
							className="w-[330px] "
							value={misDatos.name}
							onChange={(e) =>
								setMisDatos({ ...misDatos, name: e.target.value })
							}
						>
							Nombre
						</TextField>
						<TextField
							name="lastName"
							type="text"
							className="w-[330px] "
							value={misDatos.lastName}
							onChange={(e) =>
								setMisDatos({ ...misDatos, lastName: e.target.value })
							}
						>
							Apellido
						</TextField>
						<TextField
							name="address"
							type="text"
							className="w-[330px] "
							value={misDatos.address}
							onChange={(e) =>
								setMisDatos({ ...misDatos, address: e.target.value })
							}
						>
							Direccion completa
						</TextField>
					</div>

					<YellowButton type="submit" className="w-[330px]">
						Guardar
					</YellowButton>
				</form>
				<FucsiaButton
					type="button"
					className="w-[330px] mt-[15px]"
					onClick={() => router.push("/")}
				>
					Ir a home{" "}
				</FucsiaButton>
			</div>

			<Footer />
			{showMessage && <Message>{message}</Message>}
		</div>
	);
}
