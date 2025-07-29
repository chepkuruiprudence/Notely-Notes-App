"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Protectedroutes = () => {
  const token = localStorage.getItem("token");
  return token
    ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})
    : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/Login" });
};
exports.default = Protectedroutes;
