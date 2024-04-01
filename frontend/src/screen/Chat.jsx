import axios from "axios";
import { useEffect, useState } from "react";
function Chat() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const get = async () => {
      const { data } = await axios.get("/api/chat");
      setdata(data);
    };
    get();
  }, []);
  return (
    <div>
      {data.map((item) => (
        <div key={item.chatName}>{item.chatName}</div>
      ))}
    </div>
  );
}

export default Chat;
