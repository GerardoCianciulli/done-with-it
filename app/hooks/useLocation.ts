import { useEffect, useState } from "react";
import * as Location from "expo-location";

import logger from "../utility/logger";

function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | undefined | null>(
    null,
  );
  
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) return;

      const result = await Location.getLastKnownPositionAsync();
      setLocation(result);
    } catch (error: any) {
      logger.log(new Error(error));
    }
  };

  return location
    ? {
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      }
    : null;
    
}

export default useLocation;
