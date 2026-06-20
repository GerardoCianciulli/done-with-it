import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Image } from "expo-image";

import Text from "./Text";

import colors from "../config/colors";

type CardProps = {
  cardStyle?: Object;
  description?: string;
  descriptionStyle?: Object;
  imageUrl?: string;
  imageStyle?: Object;
  onPress?: () => void;
  title?: string;
  titleStyle?: Object;
  thumbnailUrl?: string;
};

function Card({
  cardStyle,
  description,
  descriptionStyle,
  imageUrl,
  imageStyle,
  onPress,
  title,
  titleStyle,
  thumbnailUrl,
}: CardProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, cardStyle]}>
        <Image
          placeholderContentFit={"cover"}
          placeholder={thumbnailUrl}
          source={{ uri: imageUrl }}
          style={[styles.image, imageStyle]}
        />
        <View style={styles.detailsContainer}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.description, descriptionStyle]}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  description: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});
