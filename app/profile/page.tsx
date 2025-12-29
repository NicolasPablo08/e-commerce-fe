"use client";
import { SubTitle } from "ui/typography";
import { YellowButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { use, useState } from "react";
export default function SignIn() {
  const [data, setData] = useState({ name: "", lastName: "", address: "" });
  function handleForm(e: any) {
    e.preventDefault();
    const name = e.target.name.value;
    const lastName = e.target.lastName.value;
    const address = e.target.address.value;
    console.log(name, lastName, address);
    //codigo para enviar los datos al back y si es true, grabamos los valores como placeholder
    setData({ name, lastName, address });
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
            <TextField name="name" type="text" placeholder={data.name || ""} className="w-[330px] ">
              Nombre
            </TextField>
            <TextField
              name="lastName"
              type="text"
              placeholder={data.lastName || ""}
              className="w-[330px] "
            >
              Apellido
            </TextField>
            <TextField
              name="address"
              type="text"
              placeholder={data.address || ""}
              className="w-[330px] "
            >
              Direccion completa
            </TextField>
          </div>

          <YellowButton type="submit" className="w-[330px]">
            Guardar
          </YellowButton>
        </form>
      </div>

      <Footer />
    </div>
  );
}
