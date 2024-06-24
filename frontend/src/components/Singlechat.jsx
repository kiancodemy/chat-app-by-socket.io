import { Box, Typography, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { io } from "socket.io-client";
import { useSendmessageMutation, useAllmessagesQuery } from "../slices/chatapi";
import { useSelector } from "react-redux";
import { useState } from "react";
import Scrolable from "./Scrolable";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Singlechat() {
  const selector = useSelector((state) => state.auth.selected);
  const { _id } = useSelector((state) => state.auth.userinfo);

  const socket = io(import.meta.env.VITE_SOME_KEY);
  const { data: info, isLoading } = useAllmessagesQuery(
    selector && selector._id
  );

  const [messages, setmessages] = useState([]);

  useEffect(() => {
    socket?.on("connect");
    socket.emit("setup", _id);
  }, []);
  useEffect(() => {
    socket.on("recieved", (data) => {
      if (!selector || data.chat._id !== selector._id) {
      }
      setmessages([...messages, data]);
    });
  });

  useEffect(() => {
    setmessages(info);
  }, [info]);

  useEffect(() => {
    if (selector) {
      socket.emit("join chat", selector._id);
    }
  }, [info]);

  const [data] = useSendmessageMutation();
  const [neww, setneww] = useState("");

  const submithandler = async () => {
    try {
      const send = await data({ content: neww, id: selector._id }).unwrap();
      await socket.emit("send message", send);
      setmessages([...messages, send]);
      setneww("");
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
            height: "60vh",
            backgroundColor: "#eee",
            borderRadius: "8px",

            display: "flex",
            padding: "5px 10px",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <Scrolable messages={messages}></Scrolable>
          <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
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
