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
const react_1 = require("react");
require("@fontsource/roboto/400.css");
const material_1 = require("@mui/material");
const lab_1 = require("@mui/lab");
const react_router_dom_1 = require("react-router-dom");
const userstore_1 = __importDefault(require("../store/userstore"));
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const axios_2 = __importDefault(require("../api/axios"));
const Login = () => {
  const { setUser } = (0, userstore_1.default)();
  const navigate = (0, react_router_dom_1.useNavigate)();
  const [identifier, setIdentifier] = (0, react_1.useState)("");
  const [passWord, setPassWord] = (0, react_1.useState)("");
  const [formError, setFormError] = (0, react_1.useState)("");
  const { isPending, mutate } = (0, react_query_1.useMutation)({
    mutationKey: ["login_user"],
    mutationFn: (loginDetails) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_2.default.post(
          "/auth/login",
          loginDetails,
        );
        return response.data;
      }),
    onError: (err) => {
      var _a;
      if (axios_1.default.isAxiosError(err)) {
        setFormError(
          (_a = err.response) === null || _a === void 0
            ? void 0
            : _a.data.message,
        );
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.userDetails);
      navigate("/dashboard");
    },
  });
  function handleSignIn() {
    setFormError("");
    mutate({ identifier: identifier.trim(), passWord: passWord.trim() });
  }
  return (0, jsx_runtime_1.jsx)(material_1.Box, {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#9EADC8",
    },
    children: (0, jsx_runtime_1.jsxs)(material_1.Card, {
      sx: {
        width: "700px",
        padding: 3,
        backgroundColor: "#OC3B2E",
        display: "flex",
        flexDirection: "column",
      },
      children: [
        (0, jsx_runtime_1.jsx)(material_1.CardContent, {
          children: (0, jsx_runtime_1.jsxs)(material_1.Stack, {
            spacing: 3,
            children: [
              formError &&
                (0, jsx_runtime_1.jsx)(material_1.Alert, {
                  severity: "error",
                  children: formError,
                }),
              (0, jsx_runtime_1.jsx)(material_1.TextField, {
                label: "userName or Email",
                variant: "outlined",
                fullWidth: true,
                required: true,
                value: identifier,
                onChange: (e) => setIdentifier(e.target.value),
                sx: { backgroundColor: "white" },
              }),
              (0, jsx_runtime_1.jsx)(material_1.TextField, {
                label: "Password",
                type: "password",
                variant: "outlined",
                fullWidth: true,
                required: true,
                value: passWord,
                onChange: (e) => setPassWord(e.target.value),
                sx: { backgroundColor: "white", borderRadius: "10px" },
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(material_1.CardActions, {
          sx: { display: "flex", justifyContent: "center", paddingBottom: 2 },
          children: [
            (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, {
              variant: "contained",
              size: "large",
              onClick: handleSignIn,
              loading: isPending,
              sx: { backgroundColor: "#3A015C" },
              children: "Sign In",
            }),
            (0, jsx_runtime_1.jsx)(material_1.Typography, {
              children: "Forgot password",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(material_1.Typography, {
          children: [
            "Don't have an account?",
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/register",
              children: "Sign Up",
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = Login;
