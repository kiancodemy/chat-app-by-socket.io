import { Box, Typography, Button, Menu } from "@mui/material";
function Modal({ userinfo, closer }) {
  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "250px", md: "400px" },

        borderRadius: "10px",
        textAlign: "center",

        backgroundColor: "white",
      }}
    >
      <Typography
        sx={{
          backgroundColor: "#ddd",
          borderRadius: "5px",
          padding: "2px",
          fontWeight: "bold",
        }}
      >
        Name :{userinfo.name}
      </Typography>
      <Typography
        sx={{ backgroundColor: "#ddd", borderRadius: "5px", padding: "2px" }}
      >
        Email:{userinfo.email}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{
            backgroundColor: "#03AED2",
            color: "white",
            padding: "5px 15px",

            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
          onClick={() => {
            closer();
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default Modal;
