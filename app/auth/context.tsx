import { createContext, Dispatch, SetStateAction } from "react";

// Define the shape of your User object
type User = {
  userId: number;
  name: string;
  email: string;
  iat: number;
};

// Define the shape of the Context itself
type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
