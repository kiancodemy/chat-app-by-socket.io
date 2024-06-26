import { Box, Typography, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { socket } from "./socket";
import { useSendmessageMutation, useAllmessagesQuery } from "../slices/chatapi";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Scrolable from "./Scrolable";
import { useEffect } from "react";
import { notify } from "../slices/userslice";
import Lottie from "react-lottie";
import * as animationData from "../animation/loading.json";
import { toast } from "react-toastify";

function Singlechat() {
  let selector = useSelector((state) => state.auth.selected);
  const { _id } = useSelector((state) => state.auth.userinfo);
  const dispatch = useDispatch();

  const [typing, settyping] = useState(false);
  const [istyping, setistyping] = useState(false);
  const [messages, setmessages] = useState([]);

  const [neww, setneww] = useState("");

  const { data: info, isLoading } = useAllmessagesQuery(
    selector && selector._id
  );

  //// amimation from lotties for loading//
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [data] = useSendmessageMutation();

  ///handle typing
  const typehandler = (e) => {
    setneww(e.target.value);
  };

  //function for sending message
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected socket");
    });
  });

  useEffect(() => {
    socket.emit("setup", _id);
  }, []);

  useEffect(() => {
    if (selector) {
      socket.emit("join chat", selector._id);
    }
  }, [selector]);

  useEffect(() => {
    if (info) {
      setmessages(info);
    }
  }, [info]);

  useEffect(() => {
    if (!typing && neww.length > 0 && selector?._id) {
      settyping(true);
      socket.emit("typing", selector?._id);
    }

    const timer = setTimeout(() => {
      settyping(false);
      socket.emit("stoptyping", selector?._id);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [neww]);

  useEffect(() => {
    socket.on("recieved", (data) => {
      if (data.chat?._id !== selector?._id) {
        dispatch(notify(data));
      } else {
        setmessages([...messages, data]);
      }
    });
    socket.on("typing", () => {
      setistyping(true);
    });
    socket.on("stoptyping", () => {
      setistyping(false);
    });
  });

  // send message function //

  const submithandler = async () => {
    try {
      const send = await data({ content: neww, id: selector._id }).unwrap();

      socket.emit("sendmessage", send);
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
            height: "58vh",

            backgroundColor: "#eee",
            borderRadius: "8px",

            display: "flex",
            padding: "10px",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <Scrolable messages={messages}></Scrolable>
          <Box sx={{ alignSelf: "start" }}>
            {istyping && (
              <Lottie height={40} width={80} options={defaultOptions}></Lottie>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <TextField
              size="small"
              placeholder="Enter the message"
              value={neww}
              onChange={typehandler}
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
