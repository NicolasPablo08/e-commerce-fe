"use client";
import { SubTitle } from "ui/typography";
import { YellowButton } from "ui/buttons";
import { TextField } from "ui/text-field";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendCode, getToken } from "lib/api";
export default function SignIn() {
  const router = useRouter();
  const [initialCode, setInitialCode] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleEmail(e: any) {
    e.preventDefault();
    const emailValue = e.target.email.value;
    console.log(email);
    sendCode(email);
    setStep("code");
  }
  async function handleCode(e: any) {
    e.preventDefault();
    const code = e.target.code.value;
    // console.log(code);
    const res = await getToken(email, code);
    //si devuelve true redirigimos
    if (res) {
      router.push("/profile");
    } else {
      throw new Error("codigo invalido");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {step === "email" ? (
        <div className={`pt-[70px] pb-[110px] items-center justify-center flex-col flex-grow flex`}>
          <form onSubmit={handleEmail} className="flex flex-col gap-[10px]">
            <div className="xl:text-center">
              <SubTitle>Ingresar</SubTitle>
            </div>
            <TextField
              name="email"
              type="email"
              placeholder="jose@mail.com"
              className="w-[333px] text-center"
              value={email}
              onChange={handleEmailChange}
            >
              Email
            </TextField>
            <YellowButton type="submit" className="w-[333px]">
              Continuar
            </YellowButton>
          </form>
        </div>
      ) : (
        <div className={`pt-[70px] pb-[110px] items-center justify-center flex-col flex-grow flex`}>
          <form onSubmit={handleCode} className="flex flex-col gap-[10px]">
            <div className="xl:text-center">
              <SubTitle>Código</SubTitle>
            </div>
            <TextField
              name="code"
              type="text"
              placeholder="12345"
              className="w-[333px] text-center"
              value={initialCode}
              onChange={(e) => setInitialCode(e.target.value)}
            >
              Ingresa el código que enviamos a tu email
            </TextField>
            <YellowButton type="submit" className="w-[333px]">
              Ingresar
            </YellowButton>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}
