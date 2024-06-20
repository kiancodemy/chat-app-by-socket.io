import { Container, Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Login from "./Login";
import Signup from "./Signup";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const { userinfo } = useSelector((state) => state.auth);

  // function for pre logged users in to page//
  useEffect(() => {
    if (userinfo) {
      navigate("/chat");
    }
  }, [userinfo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="xs" sx={{ marginTop: "20px", alignSelf: "center" }}>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <TabContext value={value}>
          <Box>
            <TabList
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                sx={{
                  width: "50%",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  fontSize: "14px",

                  "&.Mui-selected": {
                    backgroundColor: "#008DDA", // Set your desired selected tab background color
                    color: "white", // Set your desired selected tab label color
                  },
                }}
                label="login"
                value="1"
              />
              <Tab
                sx={{
                  borderRadius: "25px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  width: "50%",

                  fontSize: "14px",

                  "&.Mui-selected": {
                    borderBottom: "none",
                    backgroundColor: "#008DDA", // Set your desired selected tab background color
                    color: "white", // Set your desired selected tab label color
                  },
                }}
                label="sig up"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Login />
          </TabPanel>
          <TabPanel value="2">
            <Signup />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export default Home;
