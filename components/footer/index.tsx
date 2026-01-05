"use client";
import { Body, LargeText } from "ui/typography";
import { useState } from "react";
import { LinkedinIcon, InstagramIcon } from "ui/icons";
import Link from "next/link";
import { useMe } from "lib/hooks";
import { logout } from "lib/api";

export function Footer() {
	const data = useMe();
	const isLoggedIn = data.data;
	return (
		<footer className="w-[100%] h-[476px] bg-[black] text-[white] flex flex-col pl-[30px] pt-[50px] gap-[90px]">
			{isLoggedIn ? (
				<div>
					<div className="flex flex-col gap-[10px]">
						<Link href="/profile" passHref>
							<Body>Mi perfil</Body>
						</Link>
						<Link href="/" passHref>
							<Body>Buscar</Body>
						</Link>
						<Link href="/cart" passHref>
							<Body>Carrito</Body>
						</Link>
						<button onClick={logout} className="text-start">
							<Body>Logout</Body>
						</button>
					</div>
				</div>
			) : (
				<div>
					<div className="flex flex-col gap-[10px]">
						<Link href="/signin" passHref>
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
							<LinkedinIcon className="inline" /> My e-commerce
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
