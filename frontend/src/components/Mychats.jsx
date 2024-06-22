import { Box, Typography, Button } from "@mui/material";
import { useAllchatsQuery } from "../slices/chatapi";
import GroupModal from "./Groupmodal";
import disableScroll from "disable-scroll";

import { useSelector, useDispatch } from "react-redux";
import { selected } from "../slices/userslice";
import { useState } from "react";
function Mychats() {
  const selectedd = useSelector((state) => state.auth.selected);
  //const [selected, setselected] = useState({});
  const [opengroup, setopengroup] = useState(false);
  const dispatch = useDispatch();

  const { data, isloading } = useAllchatsQuery("s");
  const closer = () => {
    setopengroup(false);
  };

  return (
    <Box
      sx={{
        flexBasis: { xs: "100%", md: "30%" },
        display: { xs: selectedd ? "none" : "block", md: "block" },
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Box
          sx={{
            display: "flex",
            padding: "2px 8px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#aaa",
              color: "white",

              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            my chats
          </Typography>
          <Button
            onClick={() => {
              setopengroup(true);
              disableScroll.on();
            }}
            sx={{
              background: "#ddd",
              padding: "5px 10px",

              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                background: "#aaa",
                color: "white",
              },
            }}
          >
            new group chat +
          </Button>
        </Box>
        {isloading ? (
          <span>loading</span>
        ) : data && data.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              marginTop: "10px",
              textTransform: "capitalize",
              fontWeight: "bold",
              color: "#FF0000",
            }}
          >
            you have no chat yet !
          </Typography>
        ) : (
          <Box
            sx={{
              marginTop: "10px",

              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {data?.map((item) => (
              <Box
                key={item._id}
                onClick={() => dispatch(selected(item))}
                sx={{
                  backgroundColor:
                    selectedd?._id === item._id ? "#488ecc" : "#ddd",

                  padding: "15px 30px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{ color: selectedd?._id === item._id ? "#fff" : "#000" }}
                >
                  {item.isGroup ? item.chatName : item.users[1].name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {opengroup && <GroupModal closer={closer}></GroupModal>}
    </Box>
  );
}

export default Mychats;
