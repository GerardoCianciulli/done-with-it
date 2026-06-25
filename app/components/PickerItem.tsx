import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Icon from "./Icon";
import Text from "./Text";

import { ColorsType } from "../config/colors";

export type PickerItemType = {
  backgroundColor: ColorsType;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  value: number;
};

type PickerItemProps = {
  item: PickerItemType;
  onPress: () => void;
};

function PickerItem({ item, onPress }: PickerItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {item.iconName && (
          <Icon
            backgroundColor={item.backgroundColor}
            name={item.iconName}
            size={80}
          />
        )}
        <Text style={styles.label}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PickerItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: "center",
    width: 80,
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
