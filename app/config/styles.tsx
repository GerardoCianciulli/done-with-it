import { Platform } from "react-native";

import colors from "../config/colors";

export default {
  colors,
  text: {
    color: colors.darkGrey,
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
  },
};
