import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, ImageBackground } from "expo-image";

import Button from "../components/Button";
import Text from "../components/Text";

import routes from "../navigation/routes";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

function WelcomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      blurRadius={25}
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo-red.png")}
            style={styles.logo}
          />
          <Text style={styles.tagline}>Sell What You Don't Need</Text>
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate(routes.LOGIN)}
            title="Login"
          />
          <Button
            color="secondary"
            onPress={() => navigation.navigate(routes.REGISTER)}
            title="Register"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    paddingBottom: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
    height: 70,
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 100,
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: "center",
  },
  tagline: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
  },
});
