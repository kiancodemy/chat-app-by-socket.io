import { Container, Box, Typography, Button, TextField } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginBottom: "15px",
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ textTransform: "uppercase" }}>Log in </Typography>
      </Box>
      <Box
        sx={{ padding: "10px", backgroundColor: "white", borderRadius: "10px" }}
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

                  "&.Mui-selected": {
                    backgroundColor: "#008DDA", // Set your desired selected tab background color
                    color: "black", // Set your desired selected tab label color
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

                  "&.Mui-selected": {
                    borderBottom: "none",
                    backgroundColor: "#008DDA", // Set your desired selected tab background color
                    color: "black", // Set your desired selected tab label color
                  },
                }}
                label="sig up"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export default Home;
