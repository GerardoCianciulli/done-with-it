import { ScrollView, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView, { Marker } from "react-native-maps";

import Card from "../components/Card";
import { ListItem } from "../components/lists";
import Text from "../components/Text";
import Map from "../components/Map";

import colors from "../config/colors";

const data = {
  name: "Mosh Hamedani",
  avatar: require("../assets/avatar.png"),
  email: "5 Listings",
};

type ListingType = {
  categoryId: number;
  description: string;
  id: number;
  images: {
    url: string;
    thumbnailUrl: string;
  }[];
  location: {
    latitude: number;
    longitude: number;
  };
  price: number;
  title: string;
  userId: number;
};

type RootStackParamList = {
  Listings: undefined;
  ListingDetails: {
    item: ListingType;
  };
};
// Define props for the specific screen
export type ListingDetailsScreenProps =
  NativeStackScreenProps<RootStackParamList>;

function ListingDetailsScreen({ route }: ListingDetailsScreenProps) {
  const params = route.params;
  let listing: ListingType | undefined;

  if (
    route.params &&
    typeof route.params === "object" &&
    "item" in route.params
  )
    listing = route.params.item as ListingType;

  const location = listing?.location;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card
          title={listing?.title}
          description={listing?.description}
          imageUrl={listing?.images[0].url}
          cardStyle={styles.card}
          imageStyle={styles.image}
          titleStyle={styles.title}
          descriptionStyle={styles.description}
          thumbnailUrl={listing?.images[0].thumbnailUrl}
        />
        <Text style={styles.price}>{listing?.price} $</Text>
        {listing?.location !== undefined && (
          <View style={styles.mapContainer}>
            <Map location={listing?.location} />
          </View>
        )}
        <View>
          {/* User Name and avatar and email */}
          <View style={styles.avatarContainer}>
            <ListItem
              title={data.name}
              description={data.email}
              imagePath={require("../assets/avatar.png")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  image: {
    height: 300,
  },
  card: {
    borderRadius: 0,
    marginBottom: 0,
    overflow: "visible",
  },
  mapContainer: {
    width: "100%",
    height: 250,
    padding: 10,
  },
  price: {
    color: colors.secondary,
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 0,
  },
  description: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "500",
  },
});
