import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { Image } from "expo-image";

import { Form, FormField, SubmitButton } from "../components/forms";
import Text from "../components/Text";

import usersAPI from "../api/users";
import authAPI from "../api/auth";
import useAuth from "../hooks/useAuth";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().min(8).label("Password"),
});

function RegisterScreen() {
  const { logIn } = useAuth();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (userInfo: {
    name: string;
    email: string;
    password: string;
  }) => {
    const result = await usersAPI.register(userInfo);
    if (!result.ok) {
      if (
        result.data &&
        typeof result.data === "object" &&
        "error" in result.data
      ) {
        setError((result.data as any).error);
      } else {
        setError("An unexpected error occurred.");
      }
      return;
    }
    const { data: authToken } = await authAPI.login(
      userInfo.email,
      userInfo.password,
    );
    setError(undefined);
    logIn(authToken as string);
  };

  return (
    <>
      {error !== undefined && (
        <View style={styles.container}>
          <Text style={styles.error_text}> {error}</Text>
        </View>
      )}
      <View style={styles.screen}>
        <Image
          source={require("../assets/logo-red.png")}
          style={[styles.logo]}
        />
        <Form
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="words"
            autoCorrect={false}
            autoComplete="name"
            iconName="account"
            inputMode="text"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            iconName="email"
            inputMode="email"
            name="email"
            placeholder="Email"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            iconName="lock"
            inputMode="text"
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <SubmitButton title="Register" />
        </Form>
      </View>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  container: {
    backgroundColor: colors.danger,
    width: "100%",
  },
  error_text: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 40,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
});
