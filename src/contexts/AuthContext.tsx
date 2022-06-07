import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../service";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type User = {
  id: number;
  email: string;
  username: string;
  role: Role;
  status: true;
};

type Role = {
  name: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<User>({} as User);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@chat.token": token } = parseCookies();

    if (token) {
      api
        .get("/authenticate/user-logged")
        .then((response) => {
          const { id, username, email, role: { name }, status } = response.data;

          setUser({
            id,
            email,
            username, 
            role: { name },
            status
          });

        })
        .catch((error) => {
          logout();
        });
    }
  }, []);

  async function signIn({ email: userEmail , password }: SignInCredentials) {
    try {
      const response = await api.post("/authenticate/authenticate", {
        email: userEmail,
        password,
      });

      const {
        token,
        user: { username, email, id , role: { name }, status},
      } = response.data;

      setUser({
        id,
        username, 
        email,
        role: { name },
        status
      });

      setCookie(undefined, "@chat.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Credenciais inválidas",
        description: "Por favor revise as credenciais inseridas",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  }

  function logout() {
    destroyCookie(undefined, "@chat.token");

    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
