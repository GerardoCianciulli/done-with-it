import { StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import Card from "../components/Card";
import { ListItem } from "../components/lists";

const data = {
  name: "Mosh Hamedani",
  avatar: require("../assets/avatar.png"),
  email: "5 Listings",
};
type Listing = {
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
    item: {
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
  };
};
// Define props for the specific screen
export type ListingDetailsScreenProps =
  NativeStackScreenProps<RootStackParamList>;

function ListingDetailsScreen({ route }: ListingDetailsScreenProps) {
  const params = route.params;
  let listing: Listing | undefined;

  if (
    route.params &&
    typeof route.params === "object" &&
    "item" in route.params
  )
    listing = route.params.item as Listing;

  return (
    <View style={styles.container}>
      <Card
        title={listing?.title}
        description={listing?.description}
        imageUrl={listing?.images[0].url}
        cardStyle={styles.card}
        imageStyle={styles.image}
        titleStyle={styles.title}
        descriptionStyle={styles.subTitle}
        thumbnailUrl={listing?.images[0].thumbnailUrl}
      />
      <View>
        <ListItem
          title={data.name}
          description={data.email}
          imagePath={require("../assets/avatar.png")}
        />
      </View>
    </View>
  );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
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
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 20,
  },
});
