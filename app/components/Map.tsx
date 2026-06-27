import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import useLocation from "../hooks/useLocation";

type MapProps = {
  location: { latitude: number; longitude: number } | undefined | null;
};

function Map({ location }: MapProps) {
  if (location === undefined || location === null) location = useLocation();

  return (
    location && (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: location?.latitude || 0, // Center point latitude
            longitude: location?.longitude || 0, // Center point longitude
            latitudeDelta: 0.0922, // Vertical zoom level (approx. 111km per degree)
            longitudeDelta: 0.0421, // Horizontal zoom level
          }}
        >
          <Marker
            key={0}
            coordinate={{
              latitude: location?.latitude || 0,
              longitude: location?.longitude || 0,
            }}
          />
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
