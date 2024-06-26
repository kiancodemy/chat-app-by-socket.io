import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function Loading() {
  return (
    <Stack
      direction={"column"}
      spacing={4}
      sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
    >
      <LinearProgress color="inherit" />
      <Typography
        sx={{
          textTransform: "capitalize",
          color: "#124076",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        loading ...
      </Typography>
    </Stack>
  );
}

export default Loading;
