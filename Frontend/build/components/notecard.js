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
const EditNoteForm_1 = __importDefault(require("./EditNoteForm"));
const userstore_1 = __importDefault(require("../store/userstore"));
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("../api/axios"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const EditNote_1 = __importDefault(require("@mui/icons-material/EditNote"));
const PushPin_1 = __importDefault(require("@mui/icons-material/PushPin"));
const Notecard = ({ id, title, synopsis, userId, content }) => {
  const [isEditing, setIsEditing] = (0, react_1.useState)(false);
  const { user } = (0, userstore_1.default)();
  const queryClient = (0, react_query_1.useQueryClient)();
  const { mutate: updateNote } = (0, react_query_1.useMutation)({
    mutationFn: (updatedNote) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.patch(`/notes/${id}`, updatedNote);
        return res.data;
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsEditing(false);
    },
    onError: (err) => {
      console.error("update error", err);
    },
  });
  const handleSaveUpdatedNote = (updatedNote) => {
    updateNote({
      title: updatedNote.title,
      synopsis: updatedNote.synopsis,
      content: updatedNote.content,
    });
  };
  const { mutate: deleteNote } = (0, react_query_1.useMutation)({
    mutationFn: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.delete(`/notes/${id}`);
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (err) => {
      console.log("Error deleting", err);
    },
  });
  if (isEditing) {
    return (0, jsx_runtime_1.jsx)(EditNoteForm_1.default, {
      initialTitle: title,
      initialSynopsis: synopsis,
      initialContent: content,
      onSave: handleSaveUpdatedNote,
      onCancel: () => setIsEditing(false),
    });
  }
  const { mutate: togglePin } = (0, react_query_1.useMutation)({
    mutationFn: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.patch(`/notes/${id}/pin-toggle`);
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["pinnedNotes"] });
    },
  });
  return (0, jsx_runtime_1.jsx)(material_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, {
      children: [
        (0, jsx_runtime_1.jsx)(material_1.Typography, {
          children: "Create a Note.",
        }),
        (0, jsx_runtime_1.jsx)(material_1.Typography, {
          variant: "h6",
          gutterBottom: true,
          children: title,
        }),
        (0, jsx_runtime_1.jsx)(material_1.Typography, {
          variant: "body2",
          color: "text.secondary",
          gutterBottom: true,
          children: synopsis,
        }),
        (0, jsx_runtime_1.jsx)(material_1.Button, {
          component: react_router_dom_1.Link,
          to: `/notes/${id}`,
          variant: "text",
          sx: { color: "#6633CC", fontWeight: "bold" },
          children: "Read More \u2192",
        }),
        (user === null || user === void 0 ? void 0 : user.id) === userId &&
          (0, jsx_runtime_1.jsxs)(material_1.Stack, {
            direction: "row",
            spacing: 2,
            padding: 1,
            children: [
              (0, jsx_runtime_1.jsx)(Tooltip_1.default, {
                title: "Edit Note",
                children: (0, jsx_runtime_1.jsx)(material_1.IconButton, {
                  onClick: () => setIsEditing(true),
                  sx: {
                    backgroundColor: "#3A015C",
                    color: "white",
                    "&:hover": { backgroundColor: "#29013f" },
                  },
                  children: (0, jsx_runtime_1.jsx)(EditNote_1.default, {}),
                }),
              }),
              (0, jsx_runtime_1.jsx)(Tooltip_1.default, {
                title: "Delete Note",
                children: (0, jsx_runtime_1.jsx)(material_1.IconButton, {
                  onClick: () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this note?",
                      )
                    ) {
                      deleteNote();
                    }
                  },
                  sx: {
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": { backgroundColor: "#b71c1c" },
                  },
                  children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}),
                }),
              }),
              (0, jsx_runtime_1.jsx)(Tooltip_1.default, {
                title: "Toggle Pin",
                children: (0, jsx_runtime_1.jsx)(material_1.IconButton, {
                  onClick: () => togglePin(),
                  children: (0, jsx_runtime_1.jsx)(PushPin_1.default, {}),
                }),
              }),
            ],
          }),
      ],
    }),
  });
};
exports.default = Notecard;
