"use client";
import { HeaderSearch } from "@/components/headerWithSearchBar";
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
    <div className="flex flex-col min-h-screen">
      <HeaderSearch />
      <div className="flex flex-col flex-grow items-center gap-[50px] px-[30px] pt-[70px] pb-[110px]">
        <SubTitle>Ordenes de compras</SubTitle>

        {data ? (
          <div className="flex flex-col justify-center gap-[30px] items-center xl:flex-row xl:flex-wrap">
            {Object.entries(orders).map(([orderId, products]) => {
              return <Order key={orderId} orderId={orderId} products={products} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-[50px]">
            <Body>Aun no tienes pedidos realizados</Body>
          </div>
        )}
        <YellowButton className="xl:w-[250px]" onClick={() => router.back()}>
          Volver
        </YellowButton>
      </div>
      <Footer />
    </div>
  );
}
