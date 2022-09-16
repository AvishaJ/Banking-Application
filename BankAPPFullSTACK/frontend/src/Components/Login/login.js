import "./login.css";
import Box from "@mui/joy/Box";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigation = new useNavigate();
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [status, updateStatus] = useState("");
  const handleLogin = () => {
    axios
      .post("http://localhost:8800/api/v1/login", { username, password })
      .then((resp) => {
        if (resp.data.role == "admin") {
          navigation(
            `/adminDashboard/createCustomer/${resp.data.credential.username}`
          );
        } else {
          navigation(
            `/userDashboard/depositMoney/${resp.data.credential.username}`
          );
        }
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
    <h1 style={{background:"yellow",textAlign: 'center',fontFamily:"monospace"}}>Banking Application</h1>
      <div className="logindiv">
        <div className="loginformdiv">
          <form style={{ width: "50vw" }} onSubmit={handleLogin}>
            <div>
              <h3 style={{fontFamily:"roman",textAlign: 'center'}}>Login</h3>
            </div>
            <TextField
              label="User Name"
              placeholder=""
              variant="outlined"
              onChange={(e) => updateUsername(e.target.value)}
            />
            <br />
            <TextField
              label="Password"
              placeholder=""
              variant="outlined"
              onChange={(e) => updatePassword(e.target.value)}
            />
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleLogin}
              >
                Submit
              </button>
            </Box>
            <br />
            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
