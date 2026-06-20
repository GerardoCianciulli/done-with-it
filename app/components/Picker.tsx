import React, { useState } from "react";
import {
  Button,
  DimensionValue,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Text from "./Text";
import PickerItem from "./PickerItem";

import defaultStyles from "../config/styles";

type PickerProps = {
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  items: {
    backgroundColor:
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
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    label: string;
    value: number;
  }[];
  numberOfColumns: number;
  onSelectItem: (item: { label: string; value: number }) => void;
  placeholder: string;
  selectedItem:
    | undefined
    | {
        label: string;
        value: number;
      };
  width?: DimensionValue;
};

function Picker({
  iconName,
  items,
  numberOfColumns,
  onSelectItem,
  placeholder,
  selectedItem,
  width = "100%",
}: PickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const color = selectedItem
    ? defaultStyles.colors.darkGrey
    : defaultStyles.colors.grey;
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.inputContainer, { width }]}>
          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={color}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: color,
              },
            ]}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color={color} />
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.screen}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              numColumns={numberOfColumns}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => (
                <PickerItem
                  item={item}
                  onPress={() => {
                    onSelectItem(item);
                    setModalVisible(false);
                  }}
                />
              )}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </View>
  );
}

export default Picker;

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
  text: {
    flex: 1,
  },
  screen: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
});
