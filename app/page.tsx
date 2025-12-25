import { ShoppingCartIcon, EditShoppingCartIcon } from "ui/shopping-cart";
import {
	Title,
	SubTitle,
	LargeText,
	LargeTextBold,
	Body,
	BodyBold,
	Tiny,
} from "ui/typography";
import { BlueButton, YellowButton, FucsiaButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { Card } from "components/card";
import { Footer } from "components/footer";
import { Header } from "components/header";
export default function Home() {
	return (
		<div className="flex flex-col gap-[10px]">
			<Header />
			<h1 style={{ color: "var(--azul-800)" }}>Home</h1>
			<EditShoppingCartIcon />
			<Title>Titulo</Title>
			<SubTitle>Subtitulo</SubTitle>
			<LargeText>LargeText</LargeText>
			<LargeTextBold>LargeTextBold</LargeTextBold>
			<Body>Body</Body>
			<BodyBold>BodyBold</BodyBold>
			<Tiny>Tiny</Tiny>
			<BlueButton>Blue Button</BlueButton>
			<YellowButton>Yellow Button</YellowButton>
			<FucsiaButton>Fucsia Button</FucsiaButton>
			<TextField name="nombre" type="text" placeholder="placeholder">
				TextField
			</TextField>
			<Card
				img="https://via.placeholder.com/150"
				title="esta es una card muy larga"
				price={100}
			/>
			<Footer />
		</div>
	);
}
