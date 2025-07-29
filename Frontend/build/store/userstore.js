"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const UserStore = (set) => {
  return {
    user: null,
    setUser: (user) => {
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
const useUser = (0, zustand_1.create)(
  (0, middleware_1.persist)(UserStore, { name: "Notely-User" }),
);
exports.default = useUser;
