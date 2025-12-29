"use client";
import { fetchApi } from "lib/api";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import sampleSize from "lodash.samplesize";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

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
export function useMe() {
  const { data, error } = useSWR("/me", fetchApi);
  return data;
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
    fetchApi
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
