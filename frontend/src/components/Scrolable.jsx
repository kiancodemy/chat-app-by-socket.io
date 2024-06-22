import { Box, Typography } from "@mui/material";
import * as React from "react";

import ScrollableFeed from "react-scrollable-feed";
function Scrolable({ data }) {
  return (
    <Box sx={{ flexGrow: 1, overflowY: "scroll", backgroundColor: "#000" }}>
      <ScrollableFeed></ScrollableFeed>
    </Box>
  );
}

export default Scrolable;
