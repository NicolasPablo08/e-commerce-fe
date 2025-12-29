"use client";
import { Title, SubTitle } from "ui/typography";
import { BlueButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { Card } from "components/card";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useFeaturedProducts } from "lib/hooks";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleSearch = (e: any) => {
    e.preventDefault();
    const query = e.target.products.value;
    router.push("/search?query=" + query);
  };
  const destacados = useFeaturedProducts();

  return (
    <div>
      <Header />
      <div className="pt-[180px] pb-[220px] items-center flex flex-col gap-[30px] ">
        <div className="text-center">
          <Title>
            El mejor <br />
            e-commerce
          </Title>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col gap-[10px]">
          <TextField
            name="products"
            type="text"
            placeholder="Encontra tu producto ideal"
            className="w-[253px] text-center"
          />
          <BlueButton type="submit" className="w-[253px]">
            Buscar
          </BlueButton>
        </form>
      </div>
      <div className="pt-[50px] pb-[130px] bg-[var(--fucsia-A200)] flex flex-col gap-[50px] items-center">
        <SubTitle>Productos Destacados</SubTitle>
        <div className="flex flex-col gap-[20px] items-center">
          <Card
            img={destacados[0]?.imageUrl}
            title={destacados[0]?.name}
            price={destacados[0]?.amount}
            id={destacados[0]?.objectID}
          />
          <Card
            img={destacados[1]?.imageUrl}
            title={destacados[1]?.name}
            price={destacados[1]?.amount}
            id={destacados[1]?.objectID}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
