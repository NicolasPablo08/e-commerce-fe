"use client";
import { fetchApi, getSavedToken } from "lib/api";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import sampleSize from "lodash.samplesize";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

// export const productsFromSearchAtom = atom([]);
// const [products, setProducts] = useAtom(productsFromSearchAtom);
//actualizar siempre el atomo en un useEffect para evitar loops infinitos
//  useEffect(() => {
//     if (data?.results) {
//       setProducts(data.results);
//     }
//   }, [data, setProducts]);

//obeter la data de un ususario logueado con SWR
// que hara revalidaciones por si cambia los datos del user
//fetchApi obtendra el token del localStorage

// export function useMe() {
// 	const token = getSavedToken();
// 	if (!token) {
// 		return null;
// 	}
// 	const { data, error, isLoading } = useSWR("/me", fetchApi);

// 	return { data, error, isLoading };
// }
export function useMe() {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedToken = getSavedToken();
    setToken(savedToken);
    setMounted(true);
  }, []);

  const { data, error, isLoading } = useSWR(
    token ? "/me" : null, // 👈 clave condicional
    fetchApi,
  );

  if (!mounted) {
    return {
      data: null,
      error: null,
      isLoading: false,
    };
  }

  return {
    data,
    error,
    isLoading,
  };
}
// export function useMe() {
// 	const [token, setToken] = useState<string | null>(null);

// 	useEffect(() => {
// 		const savedToken = getSavedToken();
// 		setToken(savedToken);
// 	}, []); // Solo se ejecuta una vez al montar el componente

// 	if (!token) {
// 		return null; // Retorna null si no hay token
// 	}

// 	const { data, error, isLoading } = useSWR("/me", fetchApi);

// 	return { data, error, isLoading };
// }

//obtener un producto por su id, utilizaremos
//SWRInmutable ya que la info del producto
// no cambia y SWRInmutable no hara revalidaciones
export function useSingleProduct(producId: string) {
  const { data, error, isLoading } = useSWRImmutable(`/products/${producId}`, fetchApi);
  return { data, error, isLoading };
}

//obtener productos basados en una busqueda con SWRInmutable
//ya que no son necesarias revalidaciones de los datos del producto
export function useSearchProducts(query: string, offset: number) {
  const { data, error, isLoading } = useSWRImmutable(
    `/search?q=${query}&offset=${offset}&limit=8`,
    fetchApi,
  );

  return { data, error, isLoading };
}
//obtener todos los productos con SWRInmutable
//y con ello luego elegir los destacados para el home
export function useFeaturedProducts() {
  const { data, error } = useSWRImmutable("/products", fetchApi);
  //elegir dos o tres productos para mostrarlos como destacados
  // sampleSize de lodash permite elegir n elementos aleatorios de un array
  const destacados = sampleSize(data?.results, 2);
  return destacados;
}

//obtener los productos del carrito
export function useGetProductsToCart() {
  const { data, error, isLoading } = useSWR("/cart", fetchApi);
  return { data, error, isLoading };
}

//obtener los carros pendientes y finalizados
export function useGetOldsCart() {
  const { data, error, isLoading } = useSWR("/order/history", fetchApi);
  return { data, error, isLoading };
}
