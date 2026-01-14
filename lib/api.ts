"use client";
import { mutate } from "swr";

// const BASE_URL = "https://desafio-ecommerce-be.onrender.com/api";
const BASE_URL = "http://localhost:3000/api";
export async function fetchApi(endpoint: string, options: any = {}) {
	const url = BASE_URL + endpoint;
	const token = getSavedToken();
	//si hay headers los deja igual, si lo creamos como un objeto vacio
	options.headers = options.headers || {};
	options.headers["Content-Type"] = "application/json";
	if (token) {
		//si hay token lo agrego al header Authorization
		options.headers.Authorization = `Bearer ${token}`;
	}
	if (options.body) {
		//si hay body lo convierto a json siempre
		options.body = JSON.stringify(options.body);
	}
	//hacemos la llamada fetch
	try {
		const res = await fetch(url, options);
		if (res.status >= 200 && res.status < 300) {
			return res.json();
		} else {
			const errorData = await res.json();
			throw {
				message: errorData.message || "Error in the call to API",
				status: res.status,
			};
		}
	} catch (error) {
		console.error("Error in fetchApi:", error);
		throw error;
	}
}

//obtener token del localStorage
export function getSavedToken() {
	if (typeof window === "undefined") {
		// Verificamos si estamos en el navegador
		return null; // Retornamos null si estamos en el servidor
	}
	return localStorage.getItem("auth_token");
	// const token = localStorage.getItem("auth_token");
	// return token;
}
//guardar token en el localStorage
export function savedToken(token: string) {
	localStorage.setItem("auth_token", token);
}
//eliminar token del localStorage para el logout
export function removeToken() {
	if (typeof window !== "undefined") {
		localStorage.removeItem("auth_token");
	}
}
//deslogueo
export function logout() {
	removeToken();
	mutate("/me", null, { revalidate: false });
}

//recibie el email y lo envia al backend para que cree el code y lo envie al email
export async function sendCode(email: string) {
	try {
		return fetchApi("/auth", {
			method: "POST",
			body: {
				email,
			},
		});
	} catch (error) {
		console.error("Error in sendCode:", error);
		throw error;
	}
}

//recibe el codigo y el email y lo pasa al backend para que verifique y envie el token de auth
export async function getToken(email: string, code: number) {
	try {
		const res = await fetchApi("/auth/token", {
			method: "POST",
			body: {
				email,
				code,
			},
		});
		if (!res.token) {
			throw new Error("Token not received");
		}
		savedToken(res.token);
		return true;
		//o return res.token
	} catch (error) {
		console.error("Error in getToken:", error);
		throw error;
	}
}

//guarda los datos personales
export async function savedProfileData(
	name: string,
	lastName: string,
	address: string
) {
	try {
		const res = await fetchApi("/me", {
			method: "PATCH",
			body: {
				name,
				lastName,
				address,
			},
		});
		return res;
	} catch (e) {
		console.error("Error in savedProfileData:", e);
		throw e;
	}
}

////////carrito//////
export async function addProductToCart(
	productId: string,
	quantity: number,
	productName: string
) {
	try {
		const res = await fetchApi("/cart", {
			method: "POST",
			body: {
				productId,
				quantity,
				productName,
			},
		});
		return res;
	} catch (e) {
		console.error("Error in addProductToCart:", e);
		throw e;
	}
}
export async function deleteProductFromCart(productId: string) {
	try {
		const res = await fetchApi("/cart", {
			method: "DELETE",
			body: {
				productId,
			},
		});
		return res;
	} catch (e) {
		console.error("Error in deleteProductFromCart:", e);
		throw e;
	}
}
//generar compra y redireccionar a mercadopago
export async function createPurchase(cartId: string) {
	try {
		const res = await fetchApi(`/order?cartId=${cartId}`, {
			method: "POST",
		});
		return res;
	} catch (e) {
		console.error("Error in createPurchase:", e);
		throw e;
	}
}
