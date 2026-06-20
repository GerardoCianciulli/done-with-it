import { StyleSheet } from "react-native";

import Text from "../Text";

import defaultStyles from "../../config/styles";

type ErrorMessageProps = {
  error: undefined | string;
  visible: undefined | boolean;
};

function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: defaultStyles.colors.danger,
  },
});
