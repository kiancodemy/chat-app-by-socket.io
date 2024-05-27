import { Box, Typography, Button } from "@mui/material";
import { useAllchatsQuery } from "../slices/chatapi";
import GroupModal from "./Groupmodal";
import { useSelector, useDispatch } from "react-redux";
import { selected } from "../slices/userslice";
import { useState } from "react";
function Mychats() {
  const selectedd = useSelector((state) => state.auth.selected) || { id: 5 };
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
        flexBasis: "30%",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#ddd",

              padding: "5px",
              borderRadius: "5px",
            }}
          >
            my chats
          </Typography>
          <Button
            onClick={() => setopengroup(true)}
            sx={{
              background: "#eee",

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
              gap: "8px",
            }}
          >
            {data?.map((item) => (
              <Box
                onClick={() => dispatch(selected(item))}
                sx={{
                  backgroundColor:
                    selectedd?._id === item._id ? "#5AB2FF" : "#ddd",
                  color: selected._id === item._id ? "white" : "#000",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <Typography>
                  {item.isGroup ? item.chatName : item.users[0].name}
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
