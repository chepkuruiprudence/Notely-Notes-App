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
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const icons_material_1 = require("@mui/icons-material");
const react_router_dom_2 = require("react-router-dom");
const axios_1 = __importDefault(require("../api/axios"));
const axios_2 = require("axios");
const Register = () => {
  const [firstName, setFirstName] = (0, react_1.useState)("");
  const [lastName, setLastName] = (0, react_1.useState)("");
  const [userName, setUserName] = (0, react_1.useState)("");
  const [emailAddress, setEmailAddress] = (0, react_1.useState)("");
  const [passWord, setPassword] = (0, react_1.useState)("");
  const [formError, setFormError] = (0, react_1.useState)("");
  const [confirmPassword, setConfirmPassword] = (0, react_1.useState)("");
  const [showPassword, setShowPassword] = (0, react_1.useState)(false);
  const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(
    false,
  );
  const navigate = (0, react_router_dom_1.useNavigate)();
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const { isPending, mutate } = (0, react_query_1.useMutation)({
    mutationKey: ["register-user"],
    mutationFn: (newUser) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post("/auth/register", newUser, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
      }),
    onError: (err) => {
      var _a, _b;
      if ((0, axios_2.isAxiosError)(err)) {
        console.log(err);
        setFormError(
          ((_b =
            (_a = err.response) === null || _a === void 0
              ? void 0
              : _a.data) === null || _b === void 0
            ? void 0
            : _b.message) || "Server error",
        );
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
  const handleSignUp = () => {
    setFormError("");
    if (passWord !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    const newUser = {
      firstName,
      lastName,
      userName,
      emailAddress,
      passWord,
    };
    mutate(newUser);
  };
  return (0, jsx_runtime_1.jsx)(material_1.Box, {
    component: "section",
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      flexDirection: "column",
      backgroundColor: "#9EADC8",
    },
    children: (0, jsx_runtime_1.jsx)(material_1.Card, {
      sx: {
        display: "flex",
        flexDirection: "column",
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 900,
        width: "100%",
      },
      children: (0, jsx_runtime_1.jsx)(material_1.CardContent, {
        sx: { flex: 1, width: "100%" },
        children: (0, jsx_runtime_1.jsx)(material_1.Paper, {
          component: "form",
          sx: { padding: 2 },
          children: (0, jsx_runtime_1.jsxs)(material_1.Stack, {
            spacing: 3,
            children: [
              formError &&
                (0, jsx_runtime_1.jsx)(material_1.Alert, {
                  severity: "error",
                  children: formError,
                }),
              (0, jsx_runtime_1.jsxs)(material_1.Stack, {
                direction: { xs: "column", sm: "row" },
                spacing: 2,
                children: [
                  (0, jsx_runtime_1.jsx)(material_1.TextField, {
                    label: "First Name",
                    fullWidth: true,
                    required: true,
                    value: firstName,
                    onChange: (e) => setFirstName(e.target.value),
                  }),
                  (0, jsx_runtime_1.jsx)(material_1.TextField, {
                    label: "Second Name",
                    fullWidth: true,
                    required: true,
                    value: lastName,
                    onChange: (e) => setLastName(e.target.value),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(material_1.TextField, {
                label: "Username",
                fullWidth: true,
                required: true,
                value: userName,
                onChange: (e) => setUserName(e.target.value),
              }),
              (0, jsx_runtime_1.jsx)(material_1.TextField, {
                label: "Email",
                type: "email",
                fullWidth: true,
                required: true,
                value: emailAddress,
                onChange: (e) => setEmailAddress(e.target.value),
              }),
              (0, jsx_runtime_1.jsxs)(material_1.FormControl, {
                variant: "outlined",
                fullWidth: true,
                required: true,
                children: [
                  (0, jsx_runtime_1.jsx)(material_1.InputLabel, {
                    children: "Password",
                  }),
                  (0, jsx_runtime_1.jsx)(material_1.OutlinedInput, {
                    type: showPassword ? "text" : "password",
                    value: passWord,
                    onChange: (e) => setPassword(e.target.value),
                    label: "Password",
                    endAdornment: (0, jsx_runtime_1.jsx)(
                      material_1.InputAdornment,
                      {
                        position: "end",
                        children: (0, jsx_runtime_1.jsx)(
                          material_1.IconButton,
                          {
                            onClick: toggleShowPassword,
                            edge: "end",
                            children: showPassword
                              ? (0, jsx_runtime_1.jsx)(
                                  icons_material_1.VisibilityOff,
                                  {},
                                )
                              : (0, jsx_runtime_1.jsx)(
                                  icons_material_1.Visibility,
                                  {},
                                ),
                          },
                        ),
                      },
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(material_1.FormControl, {
                variant: "outlined",
                fullWidth: true,
                required: true,
                children: [
                  (0, jsx_runtime_1.jsx)(material_1.InputLabel, {
                    children: "Confirm Password",
                  }),
                  (0, jsx_runtime_1.jsx)(material_1.OutlinedInput, {
                    type: showConfirmPassword ? "text" : "password",
                    value: confirmPassword,
                    onChange: (e) => setConfirmPassword(e.target.value),
                    label: "Confirm Password",
                    endAdornment: (0, jsx_runtime_1.jsx)(
                      material_1.InputAdornment,
                      {
                        position: "end",
                        children: (0, jsx_runtime_1.jsx)(
                          material_1.IconButton,
                          {
                            onClick: toggleShowConfirmPassword,
                            edge: "end",
                            children: showConfirmPassword
                              ? (0, jsx_runtime_1.jsx)(
                                  icons_material_1.VisibilityOff,
                                  {},
                                )
                              : (0, jsx_runtime_1.jsx)(
                                  icons_material_1.Visibility,
                                  {},
                                ),
                          },
                        ),
                      },
                    ),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(material_1.Button, {
                variant: "contained",
                size: "large",
                onClick: handleSignUp,
                disabled: isPending,
                sx: { backgroundColor: "#3A015C" },
                children: "Sign Up",
              }),
              (0, jsx_runtime_1.jsxs)(material_1.Typography, {
                children: [
                  "Already have an account? ",
                  (0, jsx_runtime_1.jsx)(react_router_dom_2.Link, {
                    to: "/login",
                    children: "Login",
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    }),
  });
};
exports.default = Register;
