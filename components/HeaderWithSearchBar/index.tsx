"use client";
import { Body, SubTitle, LargeText } from "ui/typography";
import { useState } from "react";
import { ShoppingCartIcon } from "ui/icons";
import { MenuButtonIcon } from "ui/icons";
import { FucsiaButton } from "ui/buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HeaderSearch() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  function openMenu() {
    setMenuOpen(true);
  }
  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="w-[100%] h-[84px] bg-[black] ">
      <div className="px-[20px] flex justify-between items-center w-[100%] h-[100%] relative ">
        <ShoppingCartIcon className="text-[white]" />
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
          <div className="flex flex-col gap-[50px] text-center">
            <Link href="/signin" passHref>
              <SubTitle>ingresar</SubTitle>
            </Link>
            <Link href="/profile" passHref>
              <SubTitle>Mi perfil</SubTitle>
            </Link>
            <Link href="/search" passHref>
              <SubTitle>Buscar</SubTitle>
            </Link>
          </div>
          <div className="flex flex-col gap-[20px] text-center">
            <Body>miEmail@email</Body>
            <Link href="/" passHref>
              <LargeText className="text-[var(--fucsia-A200)]">Cerrar sesión</LargeText>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
