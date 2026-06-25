import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

import logger from "../utility/logger";

const key = "authToken";

const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error: any) {
    logger.log(new Error("Error storing the auth token. ", error));
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error: any) {
    logger.log(new Error("Error getting the auth token. ", error));
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token as string) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error: any) {
    logger.log(new Error("Error removing the auth token. ", error));
  }
};

export default { getToken, getUser, removeToken, storeToken };
