import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AvatarUploader from "react-avatar-uploader";
import Typography from "@mui/material/Typography";
import { Form, Divider, Portal, Segment } from "semantic-ui-react";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const pages = ["Create Contacts", "Get Contacts", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar(prop) {
  const username = prop.username;
  
  const navigation = new useNavigate();

  const handleCreateBank = () => {
    navigation(`/adminDashboard/createBank/${username}`);
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:8800/api/v1/logout").then(() => {
      navigation("/");
    });
  };
  const handleCreateAccount = () => {
    navigation(`/userDashboard/createAccount/${username}`);
  };
  const handleGetAllCustomers = () => [
    navigation(`/adminDashboard/getAllCustomers/${username}`),
  ];
  return (
    <AppBar position="static" color="secondary">
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
            Banking App <h5>&nbsp; of {username}&nbsp;</h5>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block",fontFamily: "roman" }}
              onClick={() => {
                navigation(`/adminDashboard/createCustomer/${username}`);
              }}
            >
              Create Customer
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block",fontFamily: "roman" }}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block",fontFamily: "roman" }}
              onClick={handleGetAllCustomers}
            >
               All Customers
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ my: 2, color: "white", display: "block",fontFamily: "roman" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
