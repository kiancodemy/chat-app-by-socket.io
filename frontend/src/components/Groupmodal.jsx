import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useCreategroupMutation } from "../slices/chatapi";

import { useAllusersQuery } from "../slices/Userapi";
function GroupModal({ closer }) {
  const [personName, setPersonName] = useState([]);
  const [name, setname] = useState("");
  const { data, isLoading } = useAllusersQuery("");
  const [info] = useCreategroupMutation();

  const handleChange = (e) => {
    setPersonName(
      typeof e.target.value === "string" ? value.split(",") : e.target.value
    );
  };

  const creator = async () => {
    try {
      if (!personName || !name) {
        toast.error("fill all the items", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      const create = await info({ name: name, users: personName }).unwrap();
      toast.success("Added Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
      closer();
    } catch (err) {
      toast.error(err.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
      closer();
    }
  };
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
      <TextField
        required
        value={name}
        onChange={(e) => setname(e.target.value)}
        label="select name for group "
        sx={{
          backgroundColor: "#ddd",
          borderRadius: "5px",
          padding: "2px",
          fontWeight: "bold",
        }}
      ></TextField>
      <Select
        multiple
        value={personName}
        onChange={handleChange}
        sx={{ backgroundColor: "#ddd", borderRadius: "5px", padding: "2px" }}
      >
        {!isLoading &&
          data.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
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
            closer();
          }}
        >
          Close
        </Button>
        <Button
          onClick={creator}
          sx={{
            backgroundColor: "#03AED2",
            color: "white",
            padding: "5px 15px",

            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
          }}
        >
          create
        </Button>
      </Box>
    </Box>
  );
}

export default GroupModal;
