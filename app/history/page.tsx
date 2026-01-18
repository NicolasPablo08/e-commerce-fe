"use client";
import { HeaderSearch } from "components/headerWithSearchBar";
import { Footer } from "components/footer";
import { useGetOldsCart } from "lib/hooks";
import { Order } from "components/order";
import { Body, SubTitle } from "ui/typography";
import { YellowButton } from "ui/buttons";
import { useRouter } from "next/navigation";
import groupBy from "lodash.groupby";

export default function HistoryPage() {
  const router = useRouter();
  const { data, error, isLoading } = useGetOldsCart();
  //agrupa los productos por orderId
  const orders = groupBy(data, "orderId");
  console.log(orders);

  return (
    <div>
      <HeaderSearch />
      <div className="flex flex-col px-[20px] pt-[60px] pb-[100px]">
        <SubTitle className="mb-[20px]">Ordenes de compras</SubTitle>

        {data ? (
          <div className="flex flex-col justify-center items-center">
            {Object.entries(orders).map(([orderId, products]) => {
              return <Order key={orderId} orderId={orderId} products={products} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-[50px]">
            <Body>Aun no tienes pedidos realizados</Body>
            <YellowButton onClick={() => router.push("/")}>Volver</YellowButton>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
