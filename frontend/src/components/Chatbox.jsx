import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { selected, setter } from "../slices/userslice";
import Updater from "./Updatemodel";
import Singlechat from "./Singlechat";
import disableScroll from "disable-scroll";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
function Chatbox() {
  const selector = useSelector((state) => state.auth.selected);
  const dispatch = useDispatch();

  const [updateopener, setopener] = useState(false);

  const openUpdater = () => {
    if (selector) {
      setopener((prev) => !prev);
      disableScroll.on();
    } else {
      toast.error("You Have Not Selected Chat Yet", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const closer = () => {
    setopener(false);
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        padding: "10px",

        display: { xs: selector ? "block" : "none", md: "flex" },
        flexBasis: { xs: selector ? "100%" : "70%", md: "70%" },
        backgroundColor: "white",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          border: "2px solid #aaa",
          borderRadius: "5px",
          marginBottom: "10px",
          justifyContent: "space-between",
          alignItems: "center",

          padding: "5px 10px",
        }}
      >
        <IconButton
          sx={{ display: { md: "none", xs: "block" } }}
          onClick={() => {
            dispatch(setter());
          }}
        >
          <ArrowBackIcon sx={{ cursor: "pointer" }}></ArrowBackIcon>
        </IconButton>
        {selector && selector.isGroup && (
          <Typography sx={{ fontWeight: "bold" }}>
            Group Name: {selector.chatName}
          </Typography>
        )}
        <IconButton onClick={openUpdater}>
          <VisibilityIcon></VisibilityIcon>
        </IconButton>
      </Box>
      {updateopener && <Updater closer={closer}></Updater>}
      <Singlechat></Singlechat>
    </Box>
  );
}

export default Chatbox;
