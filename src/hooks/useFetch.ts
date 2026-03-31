// import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
// import { getApi } from "../libs/apiHandler";

// type params = Record<string, unknown>;

// export const useFetch = (
//   endpoint: string,
//   params?: params,
//   options?: UseQueryOptions,
// ) => {
//   return useQuery({
//     queryKey: [endpoint, params],
//     queryFn: () => getApi(endpoint, params),
//     ...options,
//   });
// };


import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getApi } from "../libs/apiHandler";

type Params = Record<string, unknown>;

export const useFetch = <TData = unknown>(
  endpoint: string,
  params?: Params,
  options?: UseQueryOptions<TData>
) => {
  return useQuery<TData>({
    queryKey: [endpoint, params],
    queryFn: () => getApi<TData>(endpoint),
    ...options,
  });
};