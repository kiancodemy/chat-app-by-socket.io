import { Routes, Route, Link } from "react-router-dom";
import Home from "./screen/Home";
import { Box } from "@mui/material";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./components/Private";
import Chat from "./screen/Chat";
console.log(import.meta.env.VITE_SOME_KEY);
function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "start",

        backgroundImage: "url(/1.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<Chat />} />
      </Routes>
      <ToastContainer transition={Slide}></ToastContainer>
    </Box>
  );
}

export default App;
