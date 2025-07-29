"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Instagram_1 = __importDefault(require("@mui/icons-material/Instagram"));
const Facebook_1 = __importDefault(require("@mui/icons-material/Facebook"));
const X_1 = __importDefault(require("@mui/icons-material/X"));
const Footer = () => {
  return (0, jsx_runtime_1.jsx)(material_1.Box, {
    sx: {
      backgroundColor: "#34227fff",
      color: "white",
      padding: 4,
      marginTop: 4,
    },
    children: (0, jsx_runtime_1.jsx)(material_1.Container, {
      children: (0, jsx_runtime_1.jsxs)(material_1.Grid, {
        container: true,
        spacing: 2,
        sx: {
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          (0, jsx_runtime_1.jsx)(material_1.Typography, {
            children: "Not-e it down.",
          }),
          (0, jsx_runtime_1.jsx)(material_1.Typography, {
            variant: "body2",
            color: "white",
            align: "center",
            sx: { padding: 2 },
            children: "Follow us on social media for the latest updates.",
          }),
          (0, jsx_runtime_1.jsxs)(material_1.Typography, {
            variant: "body2",
            sx: { display: "flex", alignItems: "center" },
            children: [
              (0, jsx_runtime_1.jsx)(Instagram_1.default, {
                sx: { marginLeft: 1, color: "white" },
              }),
              (0, jsx_runtime_1.jsx)(Facebook_1.default, {
                sx: { marginLeft: 1, color: "white" },
              }),
              (0, jsx_runtime_1.jsx)(X_1.default, {
                sx: { marginLeft: 1, color: "white" },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(material_1.Typography, {
            variant: "body2",
            color: "text.secondary",
            align: "center",
            sx: { padding: 2, color: "white" },
            children: "\u00A9created by Prudence",
          }),
        ],
      }),
    }),
  });
};
exports.default = Footer;
