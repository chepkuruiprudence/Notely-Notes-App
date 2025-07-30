import "./App.css";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import HomePage from "./pages/homePage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import MyNotes from "./pages/MyNotes";
import Footer from "./components/Footer";
import CreateNote from "./components/CreateNote";
import Protectedroutes from "./utils/Protectedroutes";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Fullnote from "./components/Fullnote";
import Notes from "./pages/Notes";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Trash from "./pages/Trash";
import { useEffect } from "react";
import { isTokenExpired } from "./utils/isTokenExpired";

const client = new QueryClient();

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route element={<Protectedroutes />}>
                  <Route path="/Createnote" element={<CreateNote />} />
                  <Route path="/Mynotes" element={<MyNotes />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/trash" element={<Trash />} />
                </Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/Notes" element={<Notes />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/notes/:noteId" element={<Fullnote />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
