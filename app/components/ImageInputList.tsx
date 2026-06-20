import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ImageInput from "./ImageInput";

type ImageInputListProps = {
  imageUris: string[];
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string) => void;
};

function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}: ImageInputListProps) {
  const scrollView = useRef<ScrollView>(null);
  return (
    <View>
      <ScrollView
        horizontal
        onContentSizeChange={() => {
          if (scrollView.current)
            scrollView.current.scrollToEnd({ animated: true });
        }}
        ref={scrollView}
      >
        <View style={styles.container}>
          {imageUris.length > 0 &&
            imageUris.map((uri, index) => (
              <ImageInput
                imageUri={uri}
                key={index}
                onChangeImage={() => onRemoveImage(uri)}
              />
            ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

export default ImageInputList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});
