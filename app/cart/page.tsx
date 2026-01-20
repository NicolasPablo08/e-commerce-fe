"use client";
import { HeaderSearch } from "@/components/headerWithSearchBar";
import { Footer } from "components/footer";
import { SubTitle, Body, BodyBold } from "ui/typography";
import { CartCard } from "components/card";
import { BlueButton, YellowButton } from "ui/buttons";
import { useGetProductsToCart, useMe } from "lib/hooks";
import { createPurchase } from "lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Message } from "ui/message";

export default function CartPage() {
  const router = useRouter();
  const myData = useMe();

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { data, error, isLoading } = useGetProductsToCart();
  const totalToPay = (data || []).reduce((total: number, product: any) => {
    return total + product.quantity * product.amount;
  }, 0);
  async function handlePurcharse() {
    try {
      //verificar si tengo mis datos personales completos
      if (!myData.data.name || !myData.data.lastName || !myData.data.address) {
        setMessage("Debes completar tus datos personales");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setMessage("");
          //de esta forma le avisamos que venimos de cart
          //para que perfil habilite un boton que nos devuelva
          router.push("/profile?from=cart");
        }, 3000);
        return;
      }
      const urlToPay = await createPurchase(data[0].cartId);
      console.log(urlToPay);

      // window.location.href = urlToPay.sandbox_init_point;
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSearch />
      <div className="px-[20px] pt-[70px] pb-[110px] flex items-center flex-col flex-grow gap-[50px]">
        <SubTitle className="text-center">Carrito de compras</SubTitle>
        <div>
          {data ? (
            <div className="flex flex-col gap-[30px] w-[500px] xl:w-[800px]">
              <div className="flex flex-col gap-[20px] xl:gap-[30px]">
                {data.map((p: any) => (
                  <CartCard
                    key={p.objectID}
                    title={p.name}
                    img={p.imageUrl}
                    price={p.amount}
                    quantity={p.quantity}
                    id={p.objectID}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-[10px] mt-[30px] items-end ">
                <BodyBold className="xl:text-[22px]">Total: ${totalToPay}</BodyBold>
                <Body className="">
                  Te redireccionaremos a mercadopago para finalizar tu compra
                </Body>
                <BlueButton onClick={handlePurcharse}>Finalizar Compra</BlueButton>
              </div>
              <div className="flex justify-start mt-[30px]">
                <YellowButton onClick={() => router.push("/search?query=a")}>
                  Seguir comprando
                </YellowButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[50px] justify-center items-center">
              <Body>No tienes productos en el carrito</Body>
              <YellowButton onClick={() => router.push("/")} className="xl:w-[250px]">
                Buscar productos
              </YellowButton>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <div> {showMessage && <Message>{message}</Message>}</div>
    </div>
  );
}
