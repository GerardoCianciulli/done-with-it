import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

type IconProps = {
  backgroundColor?:
    | "primary"
    | "secondary"
    | "yellow"
    | "black"
    | "darkGrey"
    | "grey"
    | "lightGrey"
    | "white"
    | "danger"
    | "orange"
    | "green"
    | "teal"
    | "indigo"
    | "blue"
    | "mauve";
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor?:
    | "primary"
    | "secondary"
    | "yellow"
    | "black"
    | "darkGrey"
    | "grey"
    | "lightGrey"
    | "white"
    | "danger"
    | "orange"
    | "green"
    | "teal"
    | "indigo"
    | "blue"
    | "mauve";
  size?: number;
};

function Icon({
  backgroundColor = "black",
  iconColor = "white",
  name,
  size = 40,
}: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: defaultStyles.colors[backgroundColor],
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={name}
        size={size / 2}
        color={defaultStyles.colors[iconColor]}
      />
    </View>
  );
}

export default Icon;
