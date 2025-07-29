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
const react_1 = require("react");
const axios_1 = __importDefault(require("../api/axios"));
const PasswordEditForm_1 = __importDefault(
  require("../components/PasswordEditForm"),
);
const Profileupdate_1 = __importDefault(require("../components/Profileupdate"));
const Profile = () => {
  const [user, setUser] = (0, react_1.useState)(null);
  const [isEditing, setIsEditing] = (0, react_1.useState)(false);
  const [formValues, setFormValues] = (0, react_1.useState)({
    firstName: "",
    secondName: "",
    email: "",
    userName: "",
  });
  (0, react_1.useEffect)(() => {
    const fetchUser = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          const res = yield axios_1.default.get("/user");
          setUser(res.data);
          setFormValues({
            firstName: res.data.firstName,
            secondName: res.data.secondName,
            email: res.data.email,
            userName: res.data.userName,
          });
        } catch (error) {
          console.error("Error fetching user", error);
        }
      });
    fetchUser();
  }, []);
  if (!user)
    return (0, jsx_runtime_1.jsx)(material_1.Typography, {
      children: "Loading profile...",
    });
  const handleChange = (e) => {
    setFormValues(
      Object.assign(Object.assign({}, formValues), {
        [e.target.name]: e.target.value,
      }),
    );
  };
  const handleSave = () =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        yield axios_1.default.patch("/user", formValues);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile", error);
      }
    });
  if (!user) return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
  return (0, jsx_runtime_1.jsxs)(material_1.Box, {
    sx: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "flex-start",
      justifyContent: "center",
      gap: 4,
      padding: 2,
      paddingTop: "80px",
    },
    children: [
      (0, jsx_runtime_1.jsx)(material_1.Card, {
        sx: {
          padding: 3,
          boxShadow: 3,
          width: { xs: "100%", sm: "90%", md: "500px" },
          marginTop: { xs: 2, md: 6 },
        },
        children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsxs)(material_1.Box, {
              sx: { display: "flex", alignItems: "center", gap: 2, mb: 3 },
              children: [
                (0, jsx_runtime_1.jsx)(Profileupdate_1.default, { user: user }),
                (0, jsx_runtime_1.jsxs)(material_1.Typography, {
                  variant: "h6",
                  children: [user.firstName, " ", user.secondName],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(material_1.Stack, {
              spacing: 2,
              children: [
                (0, jsx_runtime_1.jsx)(material_1.TextField, {
                  label: "First Name",
                  name: "firstName",
                  value: formValues.firstName,
                  onChange: handleChange,
                  fullWidth: true,
                  disabled: !isEditing,
                }),
                (0, jsx_runtime_1.jsx)(material_1.TextField, {
                  label: "Second Name",
                  name: "secondName",
                  value: formValues.secondName,
                  onChange: handleChange,
                  fullWidth: true,
                  disabled: !isEditing,
                }),
                (0, jsx_runtime_1.jsx)(material_1.TextField, {
                  label: "User Name",
                  name: "userName",
                  value: formValues.userName,
                  onChange: handleChange,
                  fullWidth: true,
                  disabled: !isEditing,
                }),
                (0, jsx_runtime_1.jsx)(material_1.TextField, {
                  label: "Email",
                  name: "email",
                  value: formValues.email,
                  onChange: handleChange,
                  fullWidth: true,
                  disabled: !isEditing,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(material_1.Button, {
              variant: "contained",
              sx: { mt: 3, backgroundColor: "#6633CC" },
              fullWidth: true,
              onClick: isEditing ? handleSave : () => setIsEditing(true),
              children: isEditing ? "Save Changes" : "Edit Profile",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(material_1.Box, {
        sx: {
          width: { xs: "100%", sm: "90%", md: "500px" },
          marginTop: { xs: 2, md: 6 },
        },
        children: (0, jsx_runtime_1.jsxs)(material_1.Card, {
          sx: { padding: 3, boxShadow: 3 },
          children: [
            (0, jsx_runtime_1.jsx)(material_1.Typography, {
              variant: "h6",
              gutterBottom: true,
              children: "Change Password",
            }),
            (0, jsx_runtime_1.jsx)(PasswordEditForm_1.default, {}),
          ],
        }),
      }),
    ],
  });
};
exports.default = Profile;
