"use client";
import { Body, SubTitle, LargeText } from "ui/typography";
import { useState } from "react";
import { ShoppingCartIcon } from "ui/icons";
import { MenuButtonIcon } from "ui/icons";
import { FucsiaButton } from "ui/buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "lib/api";
import { useMe } from "lib/hooks";

export function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useMe();
  const isLoggedIn = data?.data;

  function openMenu() {
    setMenuOpen(true);
  }
  function closeMenu() {
    setMenuOpen(false);
  }
  function closeSession() {
    // lógica para cerrar sesión y enviar a otra page
    logout();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="w-[100%] h-[84px] bg-[black] ">
      <div className="px-[20px] flex justify-between items-center w-[100%] h-[100%] relative ">
        <Link href="/">
          <ShoppingCartIcon className="text-[white]" />
        </Link>
        {isLoggedIn ? (
          <button onClick={openMenu}>
            <MenuButtonIcon className="text-[white]" />
          </button>
        ) : (
          <FucsiaButton onClick={() => router.push("/signin")}>Ingresar</FucsiaButton>
        )}
      </div>
      {menuOpen && isLoggedIn && (
        <div className="bg-[black] text-[white] z-2 absolute top-[0] right-[0] w-[100%] h-screen flex flex-col justify-between pt-[50px] pb-[120px] align-center">
          <div className="flex justify-end mr-[30px]">
            <button onClick={closeMenu} className="text-[30px]">
              X
            </button>
          </div>
          <div className="flex flex-col gap-[40px] text-center">
            <Link href="/search" passHref>
              <SubTitle onClick={closeMenu}>Buscar</SubTitle>
            </Link>
            <Link href="/cart" passHref>
              <SubTitle onClick={closeMenu}>Carrito</SubTitle>
            </Link>
            <Link href="/history" passHref>
              <SubTitle onClick={closeMenu}>Pedidos</SubTitle>
            </Link>
            <Link href="/profile" passHref>
              <SubTitle onClick={closeMenu}>Mi perfil</SubTitle>
            </Link>
          </div>
          <div className="flex flex-col gap-[15px] text-center">
            <Body>{data.data.email}</Body>
            <LargeText className="text-[var(--fucsia-A200)]" onClick={closeSession}>
              Cerrar sesión
            </LargeText>
          </div>
        </div>
      )}
    </header>
  );
}
