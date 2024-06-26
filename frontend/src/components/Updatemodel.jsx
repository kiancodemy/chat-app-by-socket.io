import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import disableScroll from "disable-scroll";
import { toast } from "react-toastify";
import { nameUpdate, setter } from "../slices/userslice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  useRemovegroupMutation,
  useRenamegroupMutation,
} from "../slices/chatapi";

function GroupModal({ closer }) {
  const [data] = useRemovegroupMutation();
  const [info] = useRenamegroupMutation();

  const dispatch = useDispatch();
  const select = useSelector((state) => state.auth.selected);

  const [update, setupdate] = useState("");

  //function for delete  chat//
  const deleter = async () => {
    try {
      const deleter = await data({ id: select._id }).unwrap();
      closer();
      dispatch(setter());

      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("cant ", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  //update function
  const updater = async () => {
    try {
      if (!update) {
        toast.error("Choose New Name", {
          position: "top-right",
          autoClose: 2000,
        });
        return true;
      }
      await info({ id: select._id, name: update }).unwrap();
      dispatch(nameUpdate(update));
      closer();

      toast.success("Updated Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {}
  };

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        border: "3px solid #008DDA",

        flexDirection: "column",
        gap: "25px",
        padding: "20px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "250px", md: "350px" },

        borderRadius: "10px",
        textAlign: "center",

        backgroundColor: "white",
      }}
    >
      <Typography sx={{ textTransform: "capitalize" }} variant={"h6"}>
        update group chat
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <TextField
          size="small"
          label="Rename the group "
          value={update}
          onChange={(e) => setupdate(e.target.value)}
          sx={{
            backgroundColor: "#ddd",
            borderRadius: "5px",
            flexGrow: 1,

            fontWeight: "bold",
          }}
        ></TextField>
        <Button
          onClick={updater}
          sx={{
            "&:hover": {
              backgroundColor: "#000",
              color: "white",
            },
            textTransform: "capitalize",
            backgroundColor: "#03AED2",
            color: "white",
          }}
        >
          update
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            disableScroll.off();
            closer();
          }}
        >
          Close
        </Button>
        <Button
          onClick={deleter}
          sx={{
            backgroundColor: "#E72929",
            color: "white",
            padding: "5px 15px",
            textTransform: "capitalize",

            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
        >
          delete the group
        </Button>
      </Box>
    </Box>
  );
}

export default GroupModal;
