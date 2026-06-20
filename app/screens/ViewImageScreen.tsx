import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";

import defaultStyles from "../config/styles";

function ViewImageScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="close"
          size={30}
          color={defaultStyles.colors.white}
        />
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={30}
          color={defaultStyles.colors.white}
        />
      </SafeAreaView>
      <Image source={require("../assets/chair.jpg")} style={styles.image} />
    </View>
  );
}

export default ViewImageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.black,
    flex: 1,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
