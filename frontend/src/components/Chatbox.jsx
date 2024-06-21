import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setter } from "../slices/userslice";
import Updater from "./Updatemodel";

import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
function Chatbox() {
  const dispatch = useDispatch();

  const [updateopener, setopener] = useState(false);

  const selector = useSelector((state) => state.auth.selected);
  const closer = () => {
    setopener(false);
  };

  return (
    <Box
      sx={{
        display: { xs: selector ? "block" : "none", md: "block" },
        flexBasis: { xs: selector ? "100%" : "70%", md: "70%" },
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",

          justifyContent: { xs: "space-between", md: "end" },
          padding: "10px",
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
        <IconButton
          onClick={() => {
            setopener((prev) => !prev);
          }}
        >
          <VisibilityIcon></VisibilityIcon>
        </IconButton>
      </Box>
      {updateopener && <Updater closer={closer}></Updater>}
      <Typography>salam</Typography>
    </Box>
  );
}

export default Chatbox;
