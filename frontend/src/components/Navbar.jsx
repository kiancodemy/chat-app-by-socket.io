import {
  IconButton,
  Box,
  Typography,
  Tooltip,
  Avatar,
  MenuItem,
  Menu,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userinfo } = useSelector((state) => state.auth);

  const [open, setopen] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    setopen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setopen(false);
  };

  return (
    <Box
      role="presentation"
      sx={{
        display: "flex",
        padding: "15px",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "white",
        marginTop: "10px",
      }}
    >
      <Tooltip placement="right-end" title="Search User to chat">
        <Box
          sx={{
            display: "flex",
            borderRadius: "10px",
            gap: "2px",
            alignItems: "center",
            cursor: "pointer",
            padding: { xs: "1px 5px", md: "2px 10px" },
            backgroundColor: "#ddd",

            "&:hover": { backgroundColor: "#eee" },
          }}
        >
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              display: { xs: "none", md: "flex" },
            }}
          >
            serach user
          </Typography>
        </Box>
      </Tooltip>
      <Typography sx={{ display: { xs: "none", md: "block" } }} variant="h5">
        talk a tive
      </Typography>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Tooltip placement="top" title="notification">
          <IconButton>
            <NotificationsNoneIcon></NotificationsNoneIcon>
          </IconButton>
        </Tooltip>

        <Tooltip
          sx={{ "&:hover": { backgroundColor: "white" } }}
          placement="top"
          title="profile"
        >
          <Box
            onClick={handleClick}
            sx={{
              backgroundColor: "#eee",
              display: "flex",
              alignItems: "center",
              paddingX: "20px",
              paddingY: "5px",
              borderRadius: "10px",

              cursor: "pointer",
              "&:hover": { backgroundColor: "#ddd" },
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#5AB2FF",

                width: "30px",
                height: "30px",
              }}
              variant="rounded"
            >
              {userinfo.name}
            </Avatar>
            {open ? (
              <ArrowDropDownIcon></ArrowDropDownIcon>
            ) : (
              <ArrowDropUpIcon></ArrowDropUpIcon>
            )}
          </Box>
        </Tooltip>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>

        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default Navbar;
