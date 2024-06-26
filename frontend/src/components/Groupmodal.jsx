import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import disableScroll from "disable-scroll";

import { useState } from "react";
import { useCreategroupMutation } from "../slices/chatapi";

import { useAllusersQuery } from "../slices/Userapi";
function GroupModal({ closer }) {
  const [personName, setPersonName] = useState([]);
  const [name, setname] = useState("");
  const { data, isLoading } = useAllusersQuery("");
  const [info] = useCreategroupMutation();

  ///multiple seceltor//

  const handleChange = (e) => {
    setPersonName(
      typeof e.target.value === "string" ? value.split(",") : e.target.value
    );
  };

  ///function for creating group//

  const creator = async () => {
    try {
      if (!personName || !name) {
        toast.error("fill all the items", {
          position: "top-right",
          autoClose: 2000,
        });
      }

      await info({ name: name, users: personName }).unwrap();
      
      toast.success("Created Group Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
      closer();
    } catch (err) {
      closer();
      toast.error(err.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        border: "5px solid #008DDA",

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
      <Typography sx={{ textTransform: "capitalize" }} variant="h4">
        create group chat
      </Typography>
      <TextField
        size="small"
        label="Choose Name"
        required
        value={name}
        onChange={(e) => setname(e.target.value)}
        sx={{
          backgroundColor: "#ddd",
          borderRadius: "5px",

          fontWeight: "bold",
        }}
      ></TextField>
      <FormControl
        InputLabelProps={{
          shrink: true, // Prevent label from floating upwards
        }}
      >
        <InputLabel
          sx={{
            textTransform: "capitalize",
          }}
          id="demo-multiple-name-labe"
        >
          select members
        </InputLabel>
        <Select
          required
          size="small"
          multiple
          value={personName}
          onChange={handleChange}
          sx={{ backgroundColor: "#ddd", borderRadius: "5px", padding: "2px" }}
        >
          {!isLoading &&
            data.map((item) => (
              <MenuItem UserItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

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
            disableScroll.off();
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
