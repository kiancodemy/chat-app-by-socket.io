import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

function Singlechat() {
  const selector = useSelector((state) => state.auth.selected);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",

        flexDirection: !selector ? "row" : "column",
        justifyContent: !selector ? "center" : "stretch",
        alignItems: !selector && "center",
      }}
    >
      {!selector ? (
        <Typography
          sx={{
            textTransform: "capitalize",
            color: "#aaa",
            fontSize: "25px",
          }}
        >
          click on user to start chatting
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Typography>FFFF</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Singlechat;
