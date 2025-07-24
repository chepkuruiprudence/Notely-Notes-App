import "./App.css";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import HomePage from "./pages/homePage";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Login />
      <Register />
    </>
  );
}

export default App;
