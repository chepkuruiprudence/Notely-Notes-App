import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface user {
  firstName: string;
  userName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
}

interface UserStore {
  user: user | null;
  setUser: (userData: user) => void;
  logoutUser: () => void;
}

const UserStore: StateCreator<UserStore> = (set) => {
  return {
    user: null,
    setUser: (user: user) => {
      set(function () {
        return { user };
      });
    },
    logoutUser: () => {
      localStorage.removeItem("token");
      set({ user: null });
    },
  };
};

const useUser = create(persist(UserStore, { name: "Notely-User" }));
export default useUser;
