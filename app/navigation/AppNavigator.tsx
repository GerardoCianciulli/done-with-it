import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "../components/Icon";

import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";

import colors from "../config/colors";
import routes from "./routes";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.white,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons color={color} name="home" size={size} />
          ), //set the size that react navigation recommends
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            >
              <View
                style={{
                  bottom: 20,
                  borderColor: colors.white,
                  borderRadius: 40,
                  borderWidth: 10,
                  backgroundColor: colors.primary,
                  width: 80,
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Icon
                  backgroundColor="white"
                  iconColor="primary"
                  name="plus"
                  size={35}
                />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons color={color} name="account" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
