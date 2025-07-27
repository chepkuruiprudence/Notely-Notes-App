"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const notecard_1 = __importDefault(require("../components/notecard"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("../api/axios"));
const react_query_1 = require("@tanstack/react-query");
const material_1 = require("@mui/material");
const Notes = () => {
    const { data, isLoading, isError, error } = (0, react_query_1.useQuery)({
        queryKey: ["myNotes"],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios_1.default.get("/user/notes");
            return response.data;
        }),
    });
    if (isError) {
        return ((0, jsx_runtime_1.jsx)(material_1.Stack, { sx: { p: 5 }, alignItems: "center", children: (0, jsx_runtime_1.jsxs)(material_1.Alert, { severity: "error", children: ["Failed to load Notes: ", error.message] }) }));
    }
    if (isLoading) {
        return ((0, jsx_runtime_1.jsxs)(material_1.Stack, { sx: { p: 5 }, alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Loading Notes ..." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { paddingTop: "80px", paddingX: 2 }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, spacing: 3, children: data &&
                    data.map((note) => ((0, jsx_runtime_1.jsx)(material_1.Grid, { size: { xs: 12, sm: 6, md: 4 }, children: (0, jsx_runtime_1.jsx)(notecard_1.default, { id: note.id, title: note.title, synopsis: note.synopsis, content: note.content, userId: note.userId }) }, note.id))) }), (data === null || data === void 0 ? void 0 : data.length) === 0 && (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "No created notes yet." }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mt: 5, display: "flex", justifyContent: "center" }, children: (0, jsx_runtime_1.jsx)(material_1.Card, { sx: { width: "100%", maxWidth: 500, boxShadow: 3, borderRadius: 3 }, children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", gutterBottom: true, children: "Normalize creating notes." }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", sx: { backgroundColor: "#3A015C" }, fullWidth: true, component: react_router_dom_1.Link, to: "/createNote", children: "Create New Note" })] }) }) })] }));
};
exports.default = Notes;
