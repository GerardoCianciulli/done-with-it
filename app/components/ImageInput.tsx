import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

import defaultStyles from "../config/styles";
import logger from "../utility/logger";

const imageSize = 100;

type ImageInputProps = {
  imageUri?: string;
  onChangeImage: (uri: string) => void;
};

function ImageInput({ imageUri, onChangeImage }: ImageInputProps) {
  const [mediaLibraryPermissions, setMediaLibraryPermissions] = useState(false);
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setMediaLibraryPermissions(granted);
    if (!granted)
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage("") },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        allowsMultipleSelection: false,
        mediaTypes: ["images"],
        quality: 0.5,
      });

      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error: any) {
      logger.log(new Error("error reading an image. ", error));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={mediaLibraryPermissions ? 0.2 : 1}
      onPress={mediaLibraryPermissions ? handlePress : () => {}}
    >
      <View style={styles.container}>
        {imageUri && imageUri.length > 0 ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons
            name={"camera"}
            size={imageSize / 2}
            color={defaultStyles.colors.grey}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    width: imageSize,
    height: imageSize,
    backgroundColor: defaultStyles.colors.lightGrey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
