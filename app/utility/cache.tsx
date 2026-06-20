import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

import logger from "./logger";

const prefix = "cache";
const expiryInMinutes = 5;
let keys = [];

const storeData = async (key: string, value: string) => {
  const item = {
    value,
    timestamp: Date.now(),
  };
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error: any) {
    logger.log(new Error(error));
  }
};

const isExpired = (item: { value: string; timestamp: number }) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(prefix + key);
    if (jsonValue == null) return null;
    const item = JSON.parse(jsonValue);

    if (isExpired(item)) removeData(key);

    return item.value;
  } catch (error: any) {
    logger.log(new Error(error));
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(prefix + key);
  } catch (error: any) {
    logger.log(new Error(error));
  }
  return null;
};

export default {
  storeData,
  getData,
};
