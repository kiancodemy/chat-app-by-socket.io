import { Box, Typography, Avatar } from "@mui/material";
function UserItem({ items, access }) {
  return (
    <Box
      onClick={() => access({ id: items._id })}
      sx={{
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",

        backgroundColor: "#eee",
        padding: "10px",
        gap: "15px",
        alignitems: "center",
        "&:hover": { backgroundColor: "#008DDA", color: "white" },
      }}
      key={items._id}
    >
      <Avatar
        sx={{ width: "40px", height: "40px", alignSelf: "center" }}
        src={items.image}
        alt={items.name}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <Typography sx={{ textTransform: "capitalize" }}>
          {items.name}
        </Typography>
        <Typography sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
          Email:{items.email}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserItem;
