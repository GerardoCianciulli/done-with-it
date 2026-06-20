import { ImageSourcePropType } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

type RootStackParamList = {
  Listings: undefined;
  ListingDetails: {
    item: {
      id: string;
      title: string;
      description: string;
      imagePath: ImageSourcePropType;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const FeedNavigator = () => (
  <Stack.Navigator
    initialRouteName="Listings"
    screenOptions={{
      headerShown: false,
      presentation: "modal",
    }}
  >
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
