import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Mychats from "../components/Mychats";
import Chatbox from "../components/Chatbox";

import Navbar from "../components/Navbar";
function Chat() {
  const { userinfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userinfo) {
      return;
    } else {
      navigate("/");
    }
  }, [userinfo]);
  return (
    <Container maxWidth="lg">
      <Navbar></Navbar>
      {/*<Box sx={{ justifyContent: "space-between", display: "flex" }}>
        <Box sx={{ flexBasis: "30%", backgroundColor: "#ddd" }}>
          <Mychats></Mychats>
        </Box>
        <Box sx={{ flexBasis: "70%", backgroundColor: "#000" }}>
          <Chatbox></Chatbox>
        </Box>
  </Box>*/}
    </Container>
  );
}

export default Chat;
