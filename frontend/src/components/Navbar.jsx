import {
  IconButton,
  Box,
  Typography,
  Tooltip,
  Button,
  Avatar,
  Drawer,
  MenuItem,
  Menu,
} from "@mui/material";

import UserItem from "./UserItem";
import { selected } from "../slices/userslice";
import { useAccesschatMutation } from "../slices/chatapi";
import { useLogoutMutation, useAllusersQuery } from "../slices/Userapi";
import { toast } from "react-toastify";
import { cleardata } from "../slices/userslice";
import Modal from "./Modal";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
function Navbar() {
  const dispatch = useDispatch();
  const navigagte = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const { userinfo } = useSelector((state) => state.auth);
  //logout

  const [updater] = useLogoutMutation();
  //access chat//

  ///open close states//

  const [open, setopen] = useState(false);
  const [opendrawer, setopendrawer] = useState(false);
  const [openmodal, setopenmodal] = useState(false);
  const [search, setsearch] = useState("");

  const [find, setfind] = useState("");
  // all users//
  const { data: info, isloading } = useAllusersQuery(find);
  const [datas] = useAccesschatMutation();

  const access = async (id) => {
    try {
      const create = await datas(id).unwrap();
      await dispatch(selected(create));
      setopendrawer(false);
      toast.success("cretee in Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  ///function for findinig users///

  const findusers = async () => {
    try {
      if (!search) {
        toast.error("You Have Not Searchede Yet!!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      setfind(search);
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  //open close handler//
  const modalcloser = () => {
    setopenmodal(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setopen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    setopen(true);
  };

  const closeprofile = () => {
    setAnchorEl(null);
    setopen(false);
    setopenmodal(true);
  };

  //logout function //
  const closelogout = async () => {
    try {
      await updater();
      dispatch(cleardata());

      setAnchorEl(null);
      setopen(false);
      navigagte("/");

      toast.success("Loged out Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  ///main function///

  return (
    <Box
      sx={{
        display: "flex",

        padding: "15px",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "5px",
        backgroundColor: "white",
        marginTop: "10px",
      }}
    >
      <Tooltip placement="right-end" title="Search User to chat">
        <Box
          onClick={() => setopendrawer(true)}
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
              backgroundColor: "#008DDA",

              display: "flex",
              alignItems: "center",
              padding: "10px",

              borderRadius: "5px",

              cursor: "pointer",
              "&:hover": { backgroundColor: "#008D" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                padding: "2px 10px",
                fontSize: { md: "18px", xs: "14px" },
              }}
            >
              {userinfo.name}
            </Typography>

            {open ? (
              <ArrowDropDownIcon sx={{ color: "white" }}></ArrowDropDownIcon>
            ) : (
              <ArrowDropUpIcon sx={{ color: "white" }}></ArrowDropUpIcon>
            )}
          </Box>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={closeprofile}>Profile</MenuItem>

          <MenuItem onClick={closelogout}>Logout</MenuItem>
        </Menu>
      </Box>

      {openmodal && <Modal userinfo={userinfo} closer={modalcloser}></Modal>}
      <Drawer
        open={opendrawer}
        onClose={() => {
          setopendrawer(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "15px",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              paddingY: "5px",
              borderBottom: "2px solid #ddd",
            }}
          >
            Search users
          </Typography>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <input
              placeholder="search for user"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              type="text"
            />
            <Button
              sx={{
                backgroundColor: "#008DDA",
                color: "white",
                padding: "5px 15px",

                "&:hover": {
                  backgroundColor: "#000",
                  color: "white",
                },
              }}
              onClick={findusers}
            >
              Go
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {isloading ? (
              <Typography
                variant="h4"
                sx={{ textTransform: "capitalize", marginTop: "20px" }}
              >
                loading .....
              </Typography>
            ) : (
              info?.map((item) => (
                <UserItem
                  key={item._id}
                  items={item}
                  access={access}
                ></UserItem>
              ))
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
