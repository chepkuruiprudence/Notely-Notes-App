"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const userstore_1 = __importDefault(require("../store/userstore"));
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const Navbar = () => {
  var _a, _b, _c, _d, _e, _f;
  const { user, logoutUser } = (0, userstore_1.default)();
  const navigate = (0, react_router_dom_1.useNavigate)();
  const [mobileOpen, setMobileOpen] = (0, react_1.useState)(false);
  console.log("User from store:", user);
  (0, react_1.useEffect)(() => {
    if (!user) {
      console.warn("No user data available for avatar rendering.");
    }
  }, [user]);
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navLinks = user
    ? [
        { label: "Home", to: "/" },
        { label: "My Notes", to: "/MyNotes" },
        { label: "Create Note", to: "/Createnote" },
        { label: "Notes", to: "/Notes" },
        { label: "Profile", to: "/profile" },
        {
          icon: (0, jsx_runtime_1.jsx)(Logout_1.default, {}),
          onClick: handleLogout,
        },
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Notes", to: "/notes" },
        { label: "Register", to: "/register" },
      ];
  const drawer = (0, jsx_runtime_1.jsxs)(material_1.Box, {
    onClick: handleDrawerToggle,
    sx: { textAlign: "center" },
    children: [
      (0, jsx_runtime_1.jsx)(material_1.Typography, {
        variant: "h6",
        sx: { my: 2, color: "white" },
        children: "Notely",
      }),
      (0, jsx_runtime_1.jsx)(material_1.List, {
        children: navLinks.map((item, index) =>
          (0, jsx_runtime_1.jsx)(
            material_1.ListItem,
            {
              component: item.to ? react_router_dom_1.Link : "button",
              to: item.to,
              onClick: item.onClick,
              sx: { color: "white" },
              children: (0, jsx_runtime_1.jsx)(material_1.ListItemText, {
                primary: item.label,
              }),
            },
            index,
          ),
        ),
      }),
    ],
  });
  return (0, jsx_runtime_1.jsxs)(material_1.AppBar, {
    position: "static",
    sx: { backgroundColor: "#1e1e1e" },
    children: [
      (0, jsx_runtime_1.jsxs)(material_1.Toolbar, {
        children: [
          (0, jsx_runtime_1.jsx)(material_1.IconButton, {
            size: "large",
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            sx: { mr: 2 },
            onClick: handleDrawerToggle,
            children: (0, jsx_runtime_1.jsx)(Menu_1.default, {}),
          }),
          (0, jsx_runtime_1.jsx)(material_1.Typography, {
            variant: "h6",
            component: "div",
            sx: { fontSize: "16px", color: "white" },
            children: "Notely",
          }),
          (0, jsx_runtime_1.jsx)(material_1.Box, {
            sx: {
              display: { xs: "none", md: "flex" },
              gap: 2,
              ml: "auto",
              alignItems: "center",
              justifyContent: "center",
            },
            children: navLinks.map((item, index) =>
              item.to
                ? (0, jsx_runtime_1.jsx)(
                    material_1.Button,
                    {
                      variant: "text",
                      sx: {
                        color: "white",
                        fontSize: "16px",
                        "&:hover": { borderColor: "#fff" },
                      },
                      component: react_router_dom_1.Link,
                      to: item.to,
                      children: item.label,
                    },
                    index,
                  )
                : item.icon
                  ? (0, jsx_runtime_1.jsx)(
                      material_1.IconButton,
                      {
                        onClick: item.onClick,
                        color: "inherit",
                        sx: { ml: 2 },
                        children: item.icon,
                      },
                      index,
                    )
                  : null,
            ),
          }),
          user
            ? (0, jsx_runtime_1.jsxs)(material_1.Avatar, {
                component: react_router_dom_1.Link,
                to: "/profile",
                sx: {
                  bgcolor: "greenyellow",
                  color: "black",
                  textDecoration: "none",
                },
                children: [
                  (_c =
                    (_b =
                      (_a = user.firstName) === null || _a === void 0
                        ? void 0
                        : _a[0]) === null || _b === void 0
                      ? void 0
                      : _b.toUpperCase()) !== null && _c !== void 0
                    ? _c
                    : "",
                  (_f =
                    (_e =
                      (_d = user.secondName) === null || _d === void 0
                        ? void 0
                        : _d[0]) === null || _e === void 0
                      ? void 0
                      : _e.toUpperCase()) !== null && _f !== void 0
                    ? _f
                    : "",
                ],
              })
            : (0, jsx_runtime_1.jsx)(material_1.Typography, {
                variant: "caption",
                color: "gray",
                children: "Loading user...",
              }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(material_1.Drawer, {
        anchor: "left",
        open: mobileOpen,
        onClose: handleDrawerToggle,
        PaperProps: {
          sx: { backgroundColor: "#0C3B2E", color: "white", width: 220 },
        },
        children: drawer,
      }),
    ],
  });
};
exports.default = Navbar;
