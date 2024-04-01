import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./screen/Home";
import Chat from "./screen/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
