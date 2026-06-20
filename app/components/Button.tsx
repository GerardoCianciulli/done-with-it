import { StyleSheet, TouchableHighlight, View } from "react-native";

import Text from "./Text";

import defaultStyles from "../config/styles";

type ButtonProps = {
  title: string;
  color?: "primary" | "secondary";
  onPress: () => void;
};

function Button({ title, color = "primary", onPress }: ButtonProps) {
  return (
    <TouchableHighlight
      activeOpacity={0.7}
      underlayColor={defaultStyles.colors.white}
      onPress={onPress}
      style={styles.buttonTouchable}
    >
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: defaultStyles.colors[color] },
        ]}
      >
        <Text style={styles.button}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    color: defaultStyles.colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
  },
  buttonTouchable: {
    borderRadius: 50,
    overflow: "hidden",
    marginVertical: 10,
  },
});
