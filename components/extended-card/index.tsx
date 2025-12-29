import { Body, SubTitle, Title } from "ui/typography";
import { CelesteButton } from "@/ui/buttons";
import { useRouter } from "next/navigation";
type CardProps = {
  img: string;
  title: string;
  price: number;
  description?: string;
  id?: string;
};
export function ExtendedCard({ img, title, price, id, description }: CardProps) {
  const router = useRouter();
  function handleBuy() {
    //verificar si estoy logueado, de ser asi proceder a la compra si no redirigir al login
    //si estoy logueado verificar si tengo mis datos personales completos
    //si ambos pasos anterirores son correctos proceder a la compra
    console.log("Comprar producto con id:", id);
  }
  return (
    <div className="w-[315px] flex flex-col gap-[20px] overflow-hidden">
      <div>
        <img className="w-[100%] h-[237px] border-[1px]" src={img} alt={title} />
      </div>
      <div className="w-[100%] flex flex-col gap-[15px] overflow-hidden ">
        <div className="flex  justify-start w-[280px]">
          <SubTitle>{title}</SubTitle>
        </div>
        <div className="flex items-center justify-start">
          <Title>${price}</Title>
        </div>
        <CelesteButton className="w-[100%] h-[60px] text-black" onClick={handleBuy}>
          Comprar
        </CelesteButton>
        <div className="w-[100%] flex justify-start ">
          <Body>{description}</Body>
        </div>
      </div>
    </div>
  );
}
