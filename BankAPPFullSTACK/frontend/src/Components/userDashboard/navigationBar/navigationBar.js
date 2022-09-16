import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AvatarUploader from "react-avatar-uploader";
import Container from "@mui/material/Container";
import { Form, Divider, Portal, Segment } from "semantic-ui-react";
import Button from "@mui/material/Button";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResponsiveAppBar(prop) {
  const username = prop.username;
  const navigation = new useNavigate();

  const transferMoney = () => {
    navigation(`/userDashboard/transferMoney/${username}`);
  };
  const handleWithdrawMoney = () => {
    navigation(`/userDashboard/withdrawMoney/${username}`);
  };
  const selfTransfer = () => {
    navigation(`/userDashboard/selfTransfer/${username}`);
  };
  const handleLogout = async () => {
    await axios.post("http://localhost:8800/api/v1/logout").then(() => {
      navigation("/");
    });
  };
  const handleGetAllAccounts = () => {
    navigation(`/userDashboard/getAccounts/${username}`);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "roman",
              fontWeight: 700,
              color: "yellow",
              textDecoration: "none",
            }}
          >
            Banking App 
            <h5>&nbsp; of {username}&nbsp;</h5>
          
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" ,fontFamily: "roman" }}
              onClick={() => {
                navigation(`/userDashboard/depositMoney/${username}`);
              }}
            >
              Deposit 
            </Button>
            <Button
              onClick={handleWithdrawMoney}
              sx={{ my: 2, color: "white", display: "block" ,fontFamily: "roman"}}
              //   onClick={handleGetAllContact}
            >
              Withdraw 
            </Button>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" ,fontFamily: "roman" }}
              onClick={transferMoney}
            >
              Transfer 
            </Button>
            <Button
              onClick={handleGetAllAccounts}
              sx={{ my: 2, color: "white", display: "block" ,fontFamily: "roman"}}
            >
              Pass Book
            </Button>
          </Box>
    
          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" ,fontFamily: "roman" }}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
