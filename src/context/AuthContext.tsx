import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getApi, postApi } from "../libs/apiHandler";

type User = {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  imageURL?: string;
  [key: string]: any;
} | null;

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  fetchCurrentUser: (showLoader?: boolean) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface ContextChildren {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ContextChildren) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await postApi("/auth/logout-user");
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
    }
  }, []);

  const fetchCurrentUser = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      const res = await getApi<{data: {data: User}}>("/auth/current-user");
      if (res?.data?.data) {
        const userData = res?.data?.data;
        setUser(userData);
        return userData;
      } else {
        setUser(null);
        await logout();
      }
    } catch (error) {
      setUser(null);
      await logout();
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const info: AuthContextType = {
    user,
    setUser,
    loading,
    setLoading,
    logout,
    fetchCurrentUser,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
