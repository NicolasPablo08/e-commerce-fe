"use client";
import { SubTitle } from "ui/typography";
import { YellowButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();
  const [initialCode, setInitialCode] = useState("");
  const [email, setEmail] = useState("");
  function handleEmail(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    setEmail(email);
    console.log(email);
    //codigo para enviar el email al back y obtener el codigo
    return true;
  }
  async function handleCode(e: any) {
    e.preventDefault();
    const code = e.target.code.value;
    console.log(code);
    //codigo para enviar el código al back y verificarlo
    //si devuelve true redirigimos
    router.push("/");
  }

  return (
    <div>
      <Header />
      {!email ? (
        <div className="pt-[30px] pb-[66px] items-center flex flex-col  ">
          <form onSubmit={handleEmail} className="flex flex-col gap-[10px]">
            <div>
              <SubTitle>Ingresar</SubTitle>
            </div>
            <TextField
              name="email"
              type="email"
              placeholder="jose@mail.com"
              className="w-[253px] text-center"
            >
              Email
            </TextField>
            <YellowButton type="submit" className="w-[253px]">
              Continuar
            </YellowButton>
          </form>
        </div>
      ) : (
        <div className="pt-[30px] pb-[66px] items-center flex flex-col  ">
          <form onSubmit={handleCode} className="flex flex-col gap-[10px]">
            <div>
              <SubTitle>Código</SubTitle>
            </div>
            <TextField
              name="code"
              type="text"
              placeholder="12345"
              className="w-[253px] text-center"
              value={initialCode}
              onChange={(e) => setInitialCode(e.target.value)} // Agregá esto
            >
              Ingresa el código que enviamos a tu email
            </TextField>
            <YellowButton type="submit" className="w-[253px]">
              Ingresar
            </YellowButton>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}
