import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
  setLoading: (loading: boolean) => void;
}

const userStore: StateCreator<UserStore> = (set) => ({
  user: null,
  isLoading: true,
  setUser: (user: User) => set({ user, isLoading: false }),
  logoutUser: () => {
    set({ user: null, isLoading: false });
    localStorage.removeItem("zustand-persist-BlogIt");
  },
  setLoading: (loading: boolean) => set({ isLoading: loading }),
});

const useUser = create(persist(userStore, { name: "BlogIt" }));

export const useAuth = () => {
  const user = useUser((state) => state.user);
  const isLoading = useUser((state) => state.isLoading);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser: useUser((state) => state.setUser),
    logoutUser: useUser((state) => state.logoutUser),
    setLoading: useUser((state) => state.setLoading),
  };
};

export default useUser;
