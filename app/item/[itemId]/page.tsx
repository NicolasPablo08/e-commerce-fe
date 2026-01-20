"use client";
import { Body } from "ui/typography";
import { ExtendedCard } from "components/card";
import { Footer } from "components/footer";
import { HeaderSearch } from "components/header-witch-search";
import { useParams } from "next/navigation";
import { useSingleProduct } from "lib/hooks";
export default function SearchResults() {
	const params = useParams();
	const itemId = params.itemId as string;

	const { data, error, isLoading } = useSingleProduct(itemId);

	return (
		<div className="flex flex-col min-h-screen">
			<HeaderSearch />
			<div className="px-[40px] pt-[60px] pb-[110px] flex flex-col flex-grow items-center justify-center">
				{isLoading ? (
					<Body>Cargando producto...</Body>
				) : (
					<ExtendedCard
						title={data.name}
						price={data.amount}
						description={data.description}
						img={data.imageUrl}
						id={data.objectID}
						stock={data.stock}
					/>
				)}
			</div>

			<Footer />
		</div>
	);
}
