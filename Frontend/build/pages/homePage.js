"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const homepage_jpg_1 = __importDefault(require("../assets/images/homepage.jpg"));
const react_router_dom_1 = require("react-router-dom");
const CircleImage = (0, styles_1.styled)("img")({
    width: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "16px",
});
const StatCard = (0, styles_1.styled)(material_1.Card)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    width: "100%",
    maxWidth: 300,
    textAlign: "center",
}));
const HomePage = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 4, sx: {
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundImage: `url(${homepage_jpg_1.default})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "50vh",
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { size: { xs: 12, sm: 6, md: 4 }, sx: {
                            textAlign: "center",
                            marginBottom: 4,
                            color: "white",
                            gap: 2,
                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", gutterBottom: true, children: "Welcome to Notely" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body1", gutterBottom: true, children: "Capture your thoughts, ideas, and tasks effortlessly with Notely. Stay organized and inspired." }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", size: "large", component: react_router_dom_1.Link, to: "/login", children: "Get Started" })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { size: { xs: 12, sm: 6, md: 4 }, sx: { display: "flex", justifyContent: "center", marginBottom: 4 }, children: (0, jsx_runtime_1.jsx)(CircleImage, { src: homepage_jpg_1.default, alt: "Homepage preview" }) })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    backgroundColor: "#ffffff",
                    py: 6,
                    px: 2,
                    display: "flex",
                    justifyContent: "center",
                }, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 3, sx: {
                        maxWidth: "1000px",
                        justifyContent: "space-around",
                    }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { size: { xs: 12, sm: 6, md: 3 }, children: (0, jsx_runtime_1.jsx)(StatCard, { elevation: 3, children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: "1,200+ Notes" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", children: "Created by our users" })] }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { size: { xs: 12, sm: 6, md: 3 }, children: (0, jsx_runtime_1.jsx)(StatCard, { elevation: 3, children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: "97% Satisfaction" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", children: "Based on user feedback" })] }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { size: { xs: 12, sm: 6, md: 3 }, children: (0, jsx_runtime_1.jsx)(StatCard, { elevation: 3, children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: "Fast Sync" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", children: "Across all devices" })] }) }) })] }) })] }));
};
exports.default = HomePage;
