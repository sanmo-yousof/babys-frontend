import api from "../utils/api";

type params = Record<string, unknown>;

// export const getApi = (url: string, params: params = {}) => {
//   return api.get(url, { params });
// };

export const getApi = async <T>(
  endpoint: string,
  params?: params
): Promise<T> => {
  return api.get(endpoint, { params })
};

export const postApi = (url: string, data: params = {}) => {
  return api.post(url, data);
};

export const patchApi = (url: string, data: params = {}) => {
  return api.patch(url, data);
};

export const deleteApi = (url: string, data?: params) => {
  return api.delete(url, { data });
};
