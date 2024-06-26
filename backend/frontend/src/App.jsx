import { Routes, Route, Link } from "react-router-dom";
import Home from "./screen/Home";
import { Box } from "@mui/material";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./components/Private";
import Chat from "./screen/Chat";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",

        backgroundImage: "url(/1.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Routes>
        <Route element={<Private></Private>}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <ToastContainer limit={2} transition={Slide}></ToastContainer>
    </Box>
  );
}

export default App;
