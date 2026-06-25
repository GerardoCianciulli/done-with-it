import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../auth/context";

import authStorage from "../auth/storage";

type User = {
  userId: number;
  name: string;
  email: string;
  iat: number;
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const setUser = authContext?.setUser;

  const logIn = async (authToken: string) => {
    authStorage.storeToken(authToken);
    const user = jwtDecode(authToken) as User;
    if (setUser) setUser(user);
  };

  const logOut = async () => {
    await authStorage.removeToken();
    if (setUser) setUser(null);
  };

  return { logIn, logOut, user };
};

export default useAuth;
