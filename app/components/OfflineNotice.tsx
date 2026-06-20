import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import Text from "../components/Text";

import colors from "../config/colors";

function OfflineNotice() {
  const { type, isInternetReachable } = useNetInfo();
  return (
    type !== "unknown" &&
    isInternetReachable === false && (
      <View style={styles.container}>
        <Text style={styles.text}> No Internet Connection.</Text>
      </View>
    )
  );
}

export default OfflineNotice;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: colors.danger,
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 40,
  },
});
