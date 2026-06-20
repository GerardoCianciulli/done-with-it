import * as Updates from "expo-updates";

const settings = {
  development: {
    apiUrl: "http://10.0.0.93:9000/api",
  },
  preview: {
    apiUrl: "http://10.0.0.93:9000/api",
  },
  production: {
    apiUrl: "http://10.0.0.93:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.development;
  if (Updates.channel === "production") return settings.production;
  return settings.preview;
};

export default getCurrentSettings();
