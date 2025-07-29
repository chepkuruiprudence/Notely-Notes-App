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
const react_query_1 = require("@tanstack/react-query");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const axios_2 = __importDefault(require("../api/axios"));
const material_1 = require("@mui/material");
const CreateNote = () => {
  const [title, setTitle] = (0, react_1.useState)("");
  const [synopsis, setSynopsis] = (0, react_1.useState)("");
  const [content, setContent] = (0, react_1.useState)("");
  const [visibility, setVisibility] = (0, react_1.useState)("private");
  const [formError, setFormError] = (0, react_1.useState)("");
  const navigate = (0, react_router_dom_1.useNavigate)();
  const { mutate, isPending } = (0, react_query_1.useMutation)({
    mutationFn: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");
        const res = yield axios_2.default.post("/notes", {
          title,
          synopsis,
          content,
          visibility,
        });
        return res.data;
      }),
    onSuccess: () => {
      navigate("/Mynotes");
      setTitle("");
      setSynopsis("");
      setContent("");
      setVisibility("private");
      setFormError("");
    },
    onError: (err) => {
      var _a;
      if (axios_1.default.isAxiosError(err)) {
        setFormError(
          (_a = err.response) === null || _a === void 0
            ? void 0
            : _a.data.message,
        );
      } else {
        setFormError(err.message || "Something went wrong");
      }
    },
  });
  return (0, jsx_runtime_1.jsx)(material_1.Box, {
    sx: { display: "flex", justifyContent: "center", marginTop: 4 },
    children: (0, jsx_runtime_1.jsx)(material_1.Card, {
      sx: { width: "500px", padding: 2, marginTop: 10 },
      children: (0, jsx_runtime_1.jsx)(material_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(material_1.Stack, {
          spacing: 2,
          children: [
            (0, jsx_runtime_1.jsx)(material_1.Typography, {
              variant: "h5",
              sx: { color: "green" },
              children: "New Note",
            }),
            formError &&
              (0, jsx_runtime_1.jsx)(material_1.Alert, {
                severity: "error",
                children: formError,
              }),
            (0, jsx_runtime_1.jsx)(material_1.TextField, {
              label: "Title",
              variant: "outlined",
              value: title,
              onChange: (e) => setTitle(e.target.value),
            }),
            (0, jsx_runtime_1.jsx)(material_1.TextField, {
              label: "Synopsis",
              multiline: true,
              rows: 3,
              variant: "outlined",
              value: synopsis,
              onChange: (e) => setSynopsis(e.target.value),
            }),
            (0, jsx_runtime_1.jsx)(material_1.TextField, {
              label: "Content",
              multiline: true,
              rows: 6,
              variant: "outlined",
              value: content,
              onChange: (e) => setContent(e.target.value),
            }),
            (0, jsx_runtime_1.jsxs)(material_1.FormControl, {
              children: [
                (0, jsx_runtime_1.jsx)(material_1.FormLabel, {
                  children: "Visibility",
                }),
                (0, jsx_runtime_1.jsxs)(material_1.RadioGroup, {
                  row: true,
                  value: visibility,
                  onChange: (e) => setVisibility(e.target.value),
                  children: [
                    (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, {
                      value: "private",
                      control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}),
                      label: "Private",
                    }),
                    (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, {
                      value: "public",
                      control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}),
                      label: "Public",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(material_1.Button, {
              variant: "contained",
              color: "primary",
              sx: { backgroundColor: "#3A015C" },
              onClick: () => mutate(),
              disabled: isPending,
              children: isPending ? "Creating..." : "Create Note",
            }),
          ],
        }),
      }),
    }),
  });
};
exports.default = CreateNote;
