import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

import defaultStyles from "../config/styles";

type AppTextPops = {
  children: string | ReactNode;
  style?: object;
} & TextProps;

function AppText({ children, style, ...otherProps }: AppTextPops) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
