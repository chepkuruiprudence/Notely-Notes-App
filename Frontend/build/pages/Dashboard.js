"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const userstore_1 = __importDefault(require("../store/userstore"));
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("../api/axios"));
const notecard_1 = __importDefault(require("../components/notecard"));
const Dashboard = () => {
  var _a, _b, _c, _d;
  const { user, logoutUser } = (0, userstore_1.default)();
  const navigate = (0, react_router_dom_1.useNavigate)();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "My Notes", to: "/MyNotes" },
    { label: "Create Note", to: "/Createnote" },
    { label: "Notes", to: "/Notes" },
    { label: "Profile", to: "/profile" },
  ];
  const {
    data: pinnedNotes,
    isLoading,
    isError,
  } = (0, react_query_1.useQuery)({
    queryKey: ["pinnedNotes"],
    queryFn: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get("/notes/pinned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.data;
      }),
  });
  return (0, jsx_runtime_1.jsxs)(material_1.Grid, {
    container: true,
    height: "100vh",
    children: [
      (0, jsx_runtime_1.jsxs)(material_1.Grid, {
        size: {
          xs: 12,
          md: 3,
        },
        sx: {
          backgroundColor: "#0C3B2E",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
        },
        children: [
          (0, jsx_runtime_1.jsxs)(material_1.Box, {
            children: [
              (0, jsx_runtime_1.jsx)(material_1.Typography, {
                variant: "h5",
                mb: 2,
                children: "Notely Dashboard",
              }),
              user &&
                (0, jsx_runtime_1.jsxs)(material_1.Box, {
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                  },
                  children: [
                    (0, jsx_runtime_1.jsxs)(material_1.Avatar, {
                      component: react_router_dom_1.Link,
                      to: "/profile",
                      sx: {
                        bgcolor: "greenyellow",
                        color: "black",
                        textDecoration: "none",
                      },
                      children: [
                        ((_b =
                          (_a = user.firstName) === null || _a === void 0
                            ? void 0
                            : _a[0]) === null || _b === void 0
                          ? void 0
                          : _b.toUpperCase()) || "",
                        ((_d =
                          (_c = user.secondName) === null || _c === void 0
                            ? void 0
                            : _c[0]) === null || _d === void 0
                          ? void 0
                          : _d.toUpperCase()) || "",
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(material_1.Typography, {
                      variant: "subtitle1",
                      children: [user.firstName, " ", user.secondName],
                    }),
                  ],
                }),
              (0, jsx_runtime_1.jsx)(material_1.List, {
                children: navLinks.map((item, index) =>
                  (0, jsx_runtime_1.jsx)(
                    material_1.ListItemButton,
                    {
                      component: react_router_dom_1.Link,
                      to: item.to,
                      sx: { color: "white" },
                      children: (0, jsx_runtime_1.jsx)(
                        material_1.ListItemText,
                        { primary: item.label },
                      ),
                    },
                    index,
                  ),
                ),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(material_1.Button, {
            variant: "contained",
            sx: { backgroundColor: "red", color: "white", mt: 2 },
            onClick: handleLogout,
            children: "Logout",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(material_1.Grid, {
        size: {
          xs: 12,
          md: 9,
        },
        sx: {
          backgroundColor: "#f4f4f4",
          p: 4,
          overflowY: "auto",
        },
        children: [
          (0, jsx_runtime_1.jsxs)(material_1.Typography, {
            variant: "h4",
            gutterBottom: true,
            children: [
              "Welcome back, ",
              user === null || user === void 0 ? void 0 : user.firstName,
              "!",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(material_1.Box, {
            mt: 4,
            children: [
              (0, jsx_runtime_1.jsx)(material_1.Typography, {
                variant: "h6",
                gutterBottom: true,
                children: "Pinned Notes",
              }),
              isLoading &&
                (0, jsx_runtime_1.jsx)(material_1.Typography, {
                  children: "Loading pinned notes...",
                }),
              isError &&
                (0, jsx_runtime_1.jsx)(material_1.Typography, {
                  color: "error",
                  children: "Error loading pinned notes.",
                }),
              !isLoading &&
                (pinnedNotes === null || pinnedNotes === void 0
                  ? void 0
                  : pinnedNotes.length) === 0 &&
                (0, jsx_runtime_1.jsx)(material_1.Typography, {
                  children: "No pinned notes available.",
                }),
              (pinnedNotes === null || pinnedNotes === void 0
                ? void 0
                : pinnedNotes.length) > 0 &&
                (0, jsx_runtime_1.jsx)(material_1.Grid, {
                  container: true,
                  spacing: 2,
                  children: pinnedNotes.map((note) =>
                    (0, jsx_runtime_1.jsx)(
                      material_1.Grid,
                      {
                        size: { xs: 12, sm: 6, md: 4 },
                        children: (0, jsx_runtime_1.jsx)(notecard_1.default, {
                          id: note.id,
                          title: note.title,
                          synopsis: note.synopsis,
                          content: note.content,
                          userId: note.userId,
                        }),
                      },
                      note.id,
                    ),
                  ),
                }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = Dashboard;
