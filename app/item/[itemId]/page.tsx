"use client";
import { Body } from "ui/typography";
import { ExtendedCard } from "components/extended-card";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useParams } from "next/navigation";
import { useSingleProduct } from "lib/hooks";
export default function SearchResults() {
  const params = useParams();
  const itemId = params.itemId as string;

  const { data, error, isLoading } = useSingleProduct(itemId);

  return (
    <div>
      <Header />
      <div className="px-[40px] pt-[40px] pb-[150px] flex flex-col items-center">
        {isLoading ? (
          <Body>Cargando producto...</Body>
        ) : (
          <ExtendedCard
            title={data.name}
            price={data.amount}
            description={data.description}
            img={data.imageUrl}
            id={data.objectID}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
