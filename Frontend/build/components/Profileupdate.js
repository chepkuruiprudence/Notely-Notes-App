"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const ProfileImageUpload = ({ user }) => {
  var _a, _b, _c, _d, _e, _f;
  const [preview, setPreview] = (0, react_1.useState)(null);
  const fileInputRef = (0, react_1.useRef)(null);
  const handleAvatarClick = () => {
    var _a;
    (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
  };
  const handleImageChange = (e) => {
    var _a;
    const file =
      (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  const avatarSrc = preview || user.profileImage || undefined;
  const showInitials = !preview && !user.profileImage;
  return (0, jsx_runtime_1.jsxs)(material_1.Box, {
    sx: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    },
    children: [
      (0, jsx_runtime_1.jsx)(material_1.Avatar, {
        src: avatarSrc,
        sx: {
          width: 100,
          height: 100,
          cursor: "pointer",
          bgcolor: "transparent",
          color: "black",
          border: "2px solid #1976d2",
          fontSize: 32,
        },
        onClick: handleAvatarClick,
        children:
          showInitials &&
          `${(_c = (_b = (_a = user.firstName) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.toUpperCase()) !== null && _c !== void 0 ? _c : ""}${(_f = (_e = (_d = user.secondName) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.toUpperCase()) !== null && _f !== void 0 ? _f : ""}`,
      }),
      (0, jsx_runtime_1.jsx)(material_1.Button, {
        variant: "outlined",
        onClick: handleAvatarClick,
        children: "Upload Image",
      }),
      (0, jsx_runtime_1.jsx)("input", {
        type: "file",
        accept: "image/*",
        onChange: handleImageChange,
        ref: fileInputRef,
        style: { display: "none" },
      }),
    ],
  });
};
exports.default = ProfileImageUpload;
