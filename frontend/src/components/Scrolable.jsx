import { Box, Avatar, Tooltip } from "@mui/material";

import { useSelector } from "react-redux";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../config/func";
import ScrollableFeed from "react-scrollable-feed";
function Scrolable({ messages }) {
  const { _id: id } = useSelector((state) => state.auth.userinfo);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box sx={{ display: "flex" }} key={m?._id}>
            {(isSameSender(messages, m, i, id) ||
              isLastMessage(messages, i, id)) && (
              <Tooltip arrow title={m.sender.name} placement="bottom-start">
                <Avatar
                  alt="Remy Sharp"
                  sizes="small"
                  src={m.sender.image}
                  sx={{ marginRight: "5px", marginTop: "10px" }}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, id),
                marginTop: isSameUser(messages, m, i, id) ? 5 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </Box>
        ))}
    </ScrollableFeed>
  );
}

export default Scrolable;
