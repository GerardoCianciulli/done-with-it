import { ApisauceInstance, create } from "apisauce";
import { AxiosRequestConfig } from "axios";

import cache from "../utility/cache";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const apiClient: ApisauceInstance = create({
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  if (request.headers) request.headers["x-auth-token"] = authToken;
});

type ApiResponse<T, U> = {
  data: T;
  error: U;
}

const get = apiClient.get;
apiClient.get = async (
  url: string,
  params?: {} | undefined,
  axiosConfig?: AxiosRequestConfig<any> | undefined,
) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.storeData(url, response.data as any);
    return response;
  }

  const data = await cache.getData(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
