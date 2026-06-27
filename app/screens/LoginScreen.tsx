import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { Image } from "expo-image";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

import authAPI from "../api/auth";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export type User = {
  userId: number;
  name: string;
  email: string;
  iat: number;
};

function LoginScreen() {
  const { logIn } = useAuth();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const result = await authAPI.login(email, password);
    if (!result.ok) {
      if (
        result.data &&
        typeof result.data === "object" &&
        "error" in result.data
      )
        setError((result.data as any).error);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }
    setError(undefined);
    logIn(result.data as string);
  };

  return (
    <View style={styles.screen}>
      <Image source={require("../assets/logo-red.png")} style={[styles.logo]} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error !== undefined} />
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
          autoComplete="current-password"
          iconName="lock"
          inputMode="text"
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <SubmitButton title="Login" />
      </Form>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  screen: {
    padding: 10,
  },
});
