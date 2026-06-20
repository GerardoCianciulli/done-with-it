import React, { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";

import defaultStyles from "../../config/styles";

type ListItemProps = {
  title?: string;
  description?: string;
  iconComponent?: ReactNode;
  imagePath?: ImageSourcePropType;
  onPress?: () => void;
  renderRightActions?: (
    progress: SharedValue<number>,
    dragX: SharedValue<number>,
  ) => ReactNode;
  showChevrons?: boolean;
};

function ListItem({
  title,
  description,
  iconComponent,
  imagePath,
  onPress,
  renderRightActions,
  showChevrons,
}: ListItemProps) {
  return (
    <ReanimatedSwipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        activeOpacity={0.75}
        underlayColor={defaultStyles.colors.lightGrey}
        onPress={onPress}
      >
        <View style={styles.container}>
          {imagePath && <Image source={imagePath} style={styles.image} />}
          {iconComponent}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {description && (
              <Text style={styles.description} numberOfLines={3}>
                {description}
              </Text>
            )}
          </View>
          {showChevrons && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={defaultStyles.colors.grey}
            />
          )}
        </View>
      </TouchableHighlight>
    </ReanimatedSwipeable>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 0,
    marginBottom: 0,
    height: "auto",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.white,
  },
  image: {
    borderRadius: 35,
    width: 70,
    height: 70,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 500,
  },
  description: {
    color: defaultStyles.colors.grey,
  },
});
