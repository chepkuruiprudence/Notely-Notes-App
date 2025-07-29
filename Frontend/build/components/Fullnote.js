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
const react_markdown_1 = __importDefault(require("react-markdown"));
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("../api/axios"));
const Fullnote = () => {
  const { noteId } = (0, react_router_dom_1.useParams)();
  const {
    data: Note,
    isLoading,
    isError,
    error,
  } = (0, react_query_1.useQuery)({
    queryKey: ["singleNote", noteId],
    queryFn: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`/notes/${noteId}`);
        return response.data.data;
      }),
    enabled: !!noteId,
  });
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(material_1.Stack, {
      sx: { p: 5 },
      alignItems: "center",
      children: [
        (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}),
        (0, jsx_runtime_1.jsx)(material_1.Typography, {
          children: "Loading Note...",
        }),
      ],
    });
  }
  if (isError) {
    return (0, jsx_runtime_1.jsxs)(material_1.Alert, {
      severity: "error",
      sx: { mt: 6 },
      children: ["Failed to load note: ", error.message],
    });
  }
  if (!Note) {
    return (0, jsx_runtime_1.jsx)(material_1.Typography, {
      children: "No note found.",
    });
  }
  return (0, jsx_runtime_1.jsxs)(material_1.Container, {
    maxWidth: "md",
    sx: {
      mt: { xs: 4, md: 8 },
      p: { xs: 2, md: 4 },
      backgroundColor: "#f9f9f9",
      borderRadius: 2,
      boxShadow: 2,
    },
    children: [
      (0, jsx_runtime_1.jsx)(material_1.Typography, {
        variant: "h4",
        gutterBottom: true,
        sx: { mt: 3, fontSize: { xs: "1.8rem", md: "2.4rem" } },
        children: Note.title,
      }),
      (0, jsx_runtime_1.jsx)(material_1.Box, {
        sx: {
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
          flexWrap: "wrap",
        },
      }),
      (0, jsx_runtime_1.jsx)(material_1.Typography, {
        variant: "body1",
        component: "div",
        sx: { fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7 },
        children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, {
          children: Note.content,
        }),
      }),
    ],
  });
};
exports.default = Fullnote;
