import {
  DimensionValue,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

type AppTextInputProps = {
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  width?: DimensionValue;
} & TextInputProps;

function AppTextInput({
  iconName,
  width = "100%",
  ...otherProps
}: AppTextInputProps) {
  return (
    <View style={[styles.inputContainer, { width }]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={defaultStyles.colors.grey}
          style={styles.icon}
        />
      )}
      <TextInput
        {...otherProps}
        style={[defaultStyles.text, styles.textInput]}
        placeholderTextColor={defaultStyles.colors.grey}
      />
    </View>
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: defaultStyles.colors.lightGrey,
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
  },
});
