"use client";
import { Body, SubTitle, LargeText } from "ui/typography";
import { useState } from "react";
import { ShoppingCartIcon } from "ui/icons";
import { MenuButtonIcon } from "ui/icons";
import { FucsiaButton, YellowButton } from "ui/buttons";
import { logout } from "lib/api";
import { useMe } from "lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HeaderSearch() {
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
  function handleSearch(e: any) {
    e.preventDefault();
    const query = e.target.search.value;
    router.push("/search?query=" + query);
  }
  return (
    <header className="w-[100%] bg-[black] pt-[15px] pb-[10px]">
      <div className="px-[20px] flex flex-wrap justify-between items-center w-[100%] h-[100%] relative ">
        <Link href="/">
          <ShoppingCartIcon className="text-[white] order-1" />
        </Link>
        {isLoggedIn ? (
          <button onClick={openMenu} className="order-2 xl:order-3">
            <MenuButtonIcon className="text-[white]" />
          </button>
        ) : (
          <FucsiaButton className="order-2 xl:order-3" onClick={() => router.push("/signin")}>
            Ingresar
          </FucsiaButton>
        )}
        <form
          action=""
          className="w-full h-[138px] order-3 flex flex-col gap-[15px] justify-center items-center xl:flex-row xl:order-2 xl:w-auto xl:h-auto "
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Buscar"
            name="search"
            className="w-[328px] h-[36px] border-[3px] border-white rounded-[8px] text-white pl-[5px] xl:w-[284px]"
          />
          <YellowButton type="submit" className="w-[328px] h-[36px] xl:w-[148px]">
            Buscar
          </YellowButton>
        </form>
      </div>
      {menuOpen && isLoggedIn && (
        <div className="bg-[black] text-[white] z-2 absolute top-[0] right-[0] w-[100%] h-screen flex flex-col justify-between pt-[50px] pb-[120px] align-center">
          <div className="flex justify-end mr-[30px]">
            <button onClick={closeMenu} className="text-[30px]">
              X
            </button>
          </div>
          <div className="flex flex-col gap-[40px] text-center">
            <Link href="/" passHref>
              <SubTitle onClick={closeMenu}>Home</SubTitle>
            </Link>
            <Link href="/cart" passHref>
              <SubTitle onClick={closeMenu}>Carrito</SubTitle>
            </Link>
            <Link href="/history" passHref>
              <SubTitle onClick={closeMenu}>Mis pedidos</SubTitle>
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
