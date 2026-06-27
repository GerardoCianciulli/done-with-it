import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Icon from "../components/Icon";
import { ListItemSeporator, ListItem } from "../components/lists";

import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../hooks/useAuth";

const menuItems = [
  {
    id: "1",
    label: "My Listings",
    icon: "format-list-bulleted" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "primary" as keyof typeof colors,
  },
  {
    id: "2",
    label: "My Messages",
    icon: "email" as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"],
    backgroundColor: "secondary" as keyof typeof colors,
    targetScreen: routes.MESSAGES,
  },
];

type AccountRootStackParamList = {
  MyAccount: undefined;
  Messages: undefined;
};

function MyAccountScreen() {
  const { logOut, user } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<AccountRootStackParamList>>();

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <ListItem
          title={user?.name}
          description={user?.email}
          imagePath={require("../assets/avatar.png")}
        />
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.label}
              iconComponent={
                <Icon backgroundColor={item.backgroundColor} name={item.icon} />
              }
              onPress={() => navigation.navigate(item.targetScreen as any)}
            />
          )}
          ItemSeparatorComponent={<ListItemSeporator />}
          style={styles.list}
        />
        <ListItem
          title="Log Out"
          iconComponent={<Icon backgroundColor={"yellow"} name={"logout"} />}
          onPress={logOut}
        />
      </View>
    </SafeAreaView>
  );
}

export default MyAccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  list: {
    marginVertical: 20,
  },
});
