import { StyleSheet, View } from "react-native";

import defaultStyles from "../../config/styles";

function ListItemSeporator() {
  return <View style={styles.seporator} />;
}

export default ListItemSeporator;

const styles = StyleSheet.create({
  seporator: {
    width: "100%",
    height: 1,
    backgroundColor: defaultStyles.colors.lightGrey,
  },
});
