import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../screens/LoginScreen";

// Define the shape of the Context itself
type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
