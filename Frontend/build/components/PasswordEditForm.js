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
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("../api/axios"));
const icons_material_1 = require("@mui/icons-material");
const PasswordEditForm = () => {
  const [currentPassword, setCurrentPassword] = (0, react_1.useState)("");
  const [newPassword, setNewPassword] = (0, react_1.useState)("");
  const [confirmNewPassword, setConfirmNewPassword] = (0, react_1.useState)("");
  const [formError, setFormError] = (0, react_1.useState)("");
  const [showCurrentPassword, setShowCurrentPassword] = (0, react_1.useState)(
    false,
  );
  const [showNewPassword, setShowNewPassword] = (0, react_1.useState)(false);
  const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(
    false,
  );
  const { mutate, isPending } = (0, react_query_1.useMutation)({
    mutationFn: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.patch("/user/password", {
          currentPassword,
          newPassword,
          confirmNewPassword,
        });
        return res.data;
      }),
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFormError("");
      alert("Password updated successfully!");
    },
    onError: (err) => {
      var _a;
      setFormError(
        ((_a = err.response) === null || _a === void 0
          ? void 0
          : _a.data.message) || "Failed to update password",
      );
    },
  });
  return (0, jsx_runtime_1.jsxs)(material_1.Stack, {
    spacing: 3,
    children: [
      formError &&
        (0, jsx_runtime_1.jsx)(material_1.Alert, {
          severity: "error",
          children: formError,
        }),
      (0, jsx_runtime_1.jsxs)(material_1.FormControl, {
        variant: "outlined",
        fullWidth: true,
        children: [
          (0, jsx_runtime_1.jsx)(material_1.InputLabel, {
            children: "Current Password",
          }),
          (0, jsx_runtime_1.jsx)(material_1.OutlinedInput, {
            type: showCurrentPassword ? "text" : "password",
            value: currentPassword,
            onChange: (e) => setCurrentPassword(e.target.value),
            label: "Current Password",
            endAdornment: (0, jsx_runtime_1.jsx)(material_1.InputAdornment, {
              position: "end",
              children: (0, jsx_runtime_1.jsx)(material_1.IconButton, {
                onClick: () => setShowCurrentPassword((prev) => !prev),
                edge: "end",
                children: showCurrentPassword
                  ? (0, jsx_runtime_1.jsx)(icons_material_1.VisibilityOff, {})
                  : (0, jsx_runtime_1.jsx)(icons_material_1.Visibility, {}),
              }),
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(material_1.FormControl, {
        variant: "outlined",
        fullWidth: true,
        required: true,
        children: [
          (0, jsx_runtime_1.jsx)(material_1.InputLabel, {
            children: "New Password",
          }),
          (0, jsx_runtime_1.jsx)(material_1.OutlinedInput, {
            type: showNewPassword ? "text" : "password",
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value),
            label: "New Password",
            endAdornment: (0, jsx_runtime_1.jsx)(material_1.InputAdornment, {
              position: "end",
              children: (0, jsx_runtime_1.jsx)(material_1.IconButton, {
                onClick: () => setShowNewPassword((prev) => !prev),
                edge: "end",
                children: showNewPassword
                  ? (0, jsx_runtime_1.jsx)(icons_material_1.VisibilityOff, {})
                  : (0, jsx_runtime_1.jsx)(icons_material_1.Visibility, {}),
              }),
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(material_1.FormControl, {
        variant: "outlined",
        fullWidth: true,
        required: true,
        children: [
          (0, jsx_runtime_1.jsx)(material_1.InputLabel, {
            children: "Confirm New Password",
          }),
          (0, jsx_runtime_1.jsx)(material_1.OutlinedInput, {
            type: showConfirmPassword ? "text" : "password",
            value: confirmNewPassword,
            onChange: (e) => setConfirmNewPassword(e.target.value),
            label: "Confirm New Password",
            endAdornment: (0, jsx_runtime_1.jsx)(material_1.InputAdornment, {
              position: "end",
              children: (0, jsx_runtime_1.jsx)(material_1.IconButton, {
                onClick: () => setShowConfirmPassword((prev) => !prev),
                edge: "end",
                children: showConfirmPassword
                  ? (0, jsx_runtime_1.jsx)(icons_material_1.VisibilityOff, {})
                  : (0, jsx_runtime_1.jsx)(icons_material_1.Visibility, {}),
              }),
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(material_1.Button, {
        variant: "contained",
        sx: { backgroundColor: "#6633CC" },
        onClick: () => mutate(),
        disabled:
          isPending ||
          !currentPassword ||
          !newPassword ||
          !confirmNewPassword ||
          newPassword !== confirmNewPassword,
        children: isPending ? "Updating..." : "Update Password",
      }),
    ],
  });
};
exports.default = PasswordEditForm;
