"use client";
import React, { createContext, useState, useContext } from "react";
type AuthContextType = {
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		// Verificamos el token al iniciar
		const token = localStorage.getItem("auth_token");
		return !!token; // Devuelve true si hay token, false si no
	});

	const login = () => {
		const token = localStorage.getItem("auth_token"); // Cambia "token" por el nombre que uses
		if (token) {
			setIsLoggedIn(true);
		}
	};
	const logout = () => {
		localStorage.removeItem("auth_token"); // Cambia "token" por el nombre que uses
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	// Manejo de error si el contexto no está disponible
	if (context === undefined) {
		throw new Error("useAuth debe ser usado dentro de un AuthProvider");
	}

	return context;
}
