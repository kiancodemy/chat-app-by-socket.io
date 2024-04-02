import { Routes, Route, Link } from "react-router-dom";
import Home from "./screen/Home";
import { Box } from "@mui/material";

import Chat from "./screen/Chat";

function App() {
  return (
    <Box
      sx={{
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",

        backgroundImage: "url(/1.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Box>
  );
}

export default App;
