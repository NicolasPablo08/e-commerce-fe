"use client";
import { fetchApi, getSavedToken } from "lib/api";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import sampleSize from "lodash.samplesize";
import { useState } from "react";

export function useMe() {
  // Leemos el token directamente al inicializar
  const [token] = useState(() => {
    if (typeof window !== "undefined") {
      return getSavedToken();
    }
    return null;
  });

  const { data, error, isLoading } = useSWR(token ? "/me" : null, fetchApi, {
    // Configuraciones para que sea más rápido
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    data,
    error,
    isLoading,
    isLogged: !!data, // Helper extra
  };
}

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

//obtener ordenes pendientes y finalizados
export function useGetOldsCart() {
  const { data, error, isLoading } = useSWR("/order/history", fetchApi);
  return { data, error, isLoading };
}
