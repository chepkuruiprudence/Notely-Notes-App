import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  firstName: string;
  userName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
}

interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  logoutUser: () => void;
}

const UserStore: StateCreator<UserStore> = (set) => {
  return {
    user: null,
    setUser: (user: User) => {
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
