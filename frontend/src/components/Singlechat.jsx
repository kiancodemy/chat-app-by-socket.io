import { Box, Typography, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useSendmessageMutation, useAllmessagesQuery } from "../slices/chatapi";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Scrolable from "./Scrolable";
import { toast } from "react-toastify";
function Singlechat() {
  const selector = useSelector((state) => state.auth.selected);

  const [data] = useSendmessageMutation();
  const [neww, setneww] = useState("");
  const {
    data: info,
    isLoading,
    refetch,
  } = useAllmessagesQuery(selector && selector._id);

  if (info) {
    console.log(info);
  }
  const submithandler = async () => {
    try {
      const send = await data({ content: neww, id: selector._id }).unwrap();
      setneww("");
      console.log(send);
    } catch (err) {
      toast.error("error occured !", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",

        flexDirection: !selector ? "row" : "column",
        justifyContent: !selector && "center",
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
      ) : isLoading ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress></CircularProgress>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#eee",
            borderRadius: "8px",
            display: "flex",
            padding: "5px 10px",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <Scrolable data={info}></Scrolable>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <TextField
              size="small"
              placeholder="Enter the message"
              value={neww}
              onChange={(e) => setneww(e.target.value)}
              sx={{ flexGrow: 1 }}
            ></TextField>
            <Button
              disabled={!neww}
              onClick={submithandler}
              sx={{
                "&.Mui-disabled": { backgroundColor: "#ccc", color: "#aaa" },

                backgroundColor: "#008DDA",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Singlechat;
