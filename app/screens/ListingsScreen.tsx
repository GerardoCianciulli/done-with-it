import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import { ListItemSeporator } from "../components/lists";

import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import { useApi } from "../hooks/useApi";
import logger from "../utility/logger";

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

type ListingsApiResponse = {
  data: Listing[];
  error: boolean;
  loading: boolean;
  request: () => Promise<void>;
};

type RootStackParamList = {
  Listings: undefined;
  ListingDetails: { item: Listing };
};

function ListingsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  }: ListingsApiResponse = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  const requestPermissions = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    } catch (error: any) {
      logger.log(new Error(error));
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {error && (
        <>
          <AppText> Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={loadListings} />
        </>
      )}
      {loading ? (
        <LottieView
          autoPlay
          loop
          style={styles.animation}
          source={require("../assets/animations/loader.json")}
        />
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              description={item.price + " $"}
              imageUrl={item.images[0].url}
              onPress={() =>
                navigation.navigate(routes.LISTING_DETAILS, { item: item })
              }
              title={item.title}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          ItemSeparatorComponent={<ListItemSeporator />}
          refreshing={refreshing}
          onRefresh={() => loadListings()}
        />
      )}
    </SafeAreaView>
  );
}

export default ListingsScreen;

const styles = StyleSheet.create({
  animation: {
    width: "100%",
    height: "100%",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f8f4f4",
  },
});
