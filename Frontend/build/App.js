"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
require("./index.css");
const Login_1 = __importDefault(require("./pages/Login"));
const Register_1 = __importDefault(require("./pages/Register"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const homePage_1 = __importDefault(require("./pages/homePage"));
const react_query_1 = require("@tanstack/react-query");
const MyNotes_1 = __importDefault(require("./pages/MyNotes"));
const Footer_1 = __importDefault(require("./components/Footer"));
const CreateNote_1 = __importDefault(require("./components/CreateNote"));
const Protectedroutes_1 = __importDefault(require("./utils/Protectedroutes"));
const react_router_dom_1 = require("react-router-dom");
const Profile_1 = __importDefault(require("./pages/Profile"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Fullnote_1 = __importDefault(require("./components/Fullnote"));
const Notes_1 = __importDefault(require("./pages/Notes"));
const client = new react_query_1.QueryClient();
function App() {
    return ((0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: client, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { element: (0, jsx_runtime_1.jsx)(Protectedroutes_1.default, {}), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Createnote", element: (0, jsx_runtime_1.jsx)(CreateNote_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Mynotes", element: (0, jsx_runtime_1.jsx)(MyNotes_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/profile", element: (0, jsx_runtime_1.jsx)(Profile_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(homePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Notes", element: (0, jsx_runtime_1.jsx)(Notes_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/notes/:noteId", element: (0, jsx_runtime_1.jsx)(Fullnote_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }) }));
}
exports.default = App;
