"use client";
import { Body, LargeText } from "ui/typography";
import { useState } from "react";
import { TwitterIcon, InstagramIcon } from "ui/icons";
import Link from "next/link";
export function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <footer className="w-[100%] h-[476px] bg-[black] text-[white] flex flex-col pl-[30px] pt-[50px] gap-[90px]">
      {isLoggedIn ? (
        <div>
          <div className="flex flex-col gap-[10px]">
            <Link href="/" passHref>
              <Body>Mi perfil</Body>
            </Link>
            <Link href="/" passHref>
              <Body>Buscar</Body>
            </Link>
            <Link href="/" passHref>
              <Body>Logout</Body>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-[10px]">
            <Link href="/" passHref>
              <Body>Ingresar</Body>
            </Link>
            <Link href="/" passHref>
              <Body>Buscar</Body>
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-[5px]">
        <LargeText>Redes</LargeText>
        <div className="flex flex-col gap-[10px]">
          <Link href="/" passHref>
            <Body>
              <TwitterIcon className="inline" /> My e-commerce
            </Body>
          </Link>
          <Link href="/" passHref>
            <Body>
              <InstagramIcon className="inline" /> My e-commerce
            </Body>
          </Link>
        </div>
      </div>
    </footer>
  );
}
