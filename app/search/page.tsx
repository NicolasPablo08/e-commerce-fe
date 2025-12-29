"use client";
import { Body } from "ui/typography";
import { Card } from "components/card";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useSearchParams } from "next/navigation";
import { useSearchProducts } from "lib/hooks";
import { useEffect, useState } from "react";
type Product = {
  objectID: string;
  imageUrl: string;
  name: string;
  amount: number;
};
export default function SearchResults() {
  const [offset, setOffset] = useState(0); // offset inicial
  const [products, setProducts] = useState<Product[]>([]); //para ir acumulando los productos
  const [initialLoad, setInitialLoad] = useState(true); // para que loading solo se muestr en la llamad inicial

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, error, isLoading } = useSearchProducts(query, offset);
  console.log(data?.results, isLoading);

  // Cuando cambian los datos, acumulamos productos
  useEffect(() => {
    if (data?.results) {
      setProducts((prev: Product[]) => [...prev, ...data.results]);
      setInitialLoad(false);
    }
  }, [data?.results]);

  const total = data?.pagination?.total || "";
  const viewingProducts = products.length;

  function handleNewProducts() {
    setOffset((prevOffset) => prevOffset + 4); // aumentamos el offset en 4 para cargar más productos
  }
  return (
    <div>
      <Header />
      <div className="px-[40px] pt-[40px] pb-[150px] flex flex-col items-center">
        {isLoading && initialLoad ? (
          <Body>Cargando productos...</Body>
        ) : data?.pagination?.total == 0 ? (
          <Body className="max-w-[350px]">
            No se encotraron productos relacionados a la busqueda, intenta con otra palabra.
          </Body>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <Body>{`Mostrando ${viewingProducts} productos de ${total}`}</Body>
            <div className="flex flex-col gap-[20px]">
              {products.map((p: any) => (
                <Card
                  key={p.objectID}
                  img={p.imageUrl}
                  title={p.name}
                  price={p.amount}
                  id={p.objectID}
                />
              ))}
            </div>
            {viewingProducts < total && (
              <button
                onClick={handleNewProducts}
                className="text-[blue] pointer-cursor bg-[transparent] border-[none] mt-[20px]"
              >
                {"Ver más >"}
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
