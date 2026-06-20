import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import colors from "../config/colors";

type UploadScreenProps = {
  onDone: () => void;
  progress: number;
  visible: boolean;
};

function UploadScreen({
  onDone,
  progress = 0,
  visible = false,
}: UploadScreenProps) {
  return (
    <Modal visible={visible}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.container}>
            {progress < 1 ? (
              <Progress.Bar
                color={colors.primary}
                progress={progress}
                width={200}
              />
            ) : (
              <LottieView
                autoPlay
                loop={false}
                onAnimationFinish={onDone}
                style={styles.animation}
                source={require("../assets/animations/done.json")}
              />
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

export default UploadScreen;

const styles = StyleSheet.create({
  animation: { width: 150, height: "100%" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen: { flex: 1 },
});
