"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const EditNoteForm = ({ initialTitle, initialSynopsis, initialContent, onSave, onCancel, }) => {
    const [title, setTitle] = (0, react_1.useState)(initialTitle);
    const [synopsis, setSynopsis] = (0, react_1.useState)(initialSynopsis);
    const [content, setContent] = (0, react_1.useState)(initialContent);
    const handleSaveUpdatedNote = () => {
        onSave({ title, synopsis, content });
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Card, { children: (0, jsx_runtime_1.jsx)(material_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(material_1.Stack, { children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Title", variant: "outlined", multiline: true, rows: 2, value: title, onChange: (e) => setTitle(e.target.value), fullWidth: true }), (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Synopsis", variant: "outlined", multiline: true, rows: 4, value: synopsis, onChange: (e) => setSynopsis(e.target.value), fullWidth: true }), (0, jsx_runtime_1.jsx)(material_1.TextField, { label: "Content", variant: "outlined", multiline: true, rows: 2, value: content, onChange: (e) => setContent(e.target.value), fullWidth: true }), (0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: { xs: "column", sm: "row" }, spacing: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", onClick: handleSaveUpdatedNote, fullWidth: true, children: "Save Changes" }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", color: "secondary", onClick: onCancel, fullWidth: true, children: "Cancel" })] })] }) }) }) }));
};
exports.default = EditNoteForm;
