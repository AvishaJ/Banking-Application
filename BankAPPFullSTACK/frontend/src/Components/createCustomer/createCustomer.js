import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CreateCustomer() {
  const [firstName, updatefirstName] = useState("");
  const [lastName, updatelastName] = useState("");
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [status, updateStatus] = useState("");
  const [role, updateRole] = useState("user");
  const currentUser = useParams();
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isAdminLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateLoginStatus(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateLoginStatus(false);
      });
  }, []);

  if (!loginStatus) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "red", fontSize: "20px" }}>
          User not logged in please login by clicking below
        </p>

        <button
          onClick={() => navigation("/")}
          class="btn btn-secondary button"
        >
          login
        </button>
      </div>
    );
  }
  const handleCreateCustomer = () => {
    axios
      .post("http://localhost:8800/api/v1/createCustomer", {
        firstName,
        lastName,
        username,
        password,
        role,
      })
      .then((resp) => {
        updateStatus("Customer Created!");
      })
      .catch((error) => {
        updateStatus(error.response.data);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={
            {
              // padding: "40px",
              // background: "black",
              // width: "auto",
            }
          }
        >
          <form
            style={{ width: "50vw", background: "", padding: "10px" }}
          >
            <div>
              <h3 >Create Customer Form</h3>
            </div>
            <TextField
              label="First Name"
              variant="outlined"
              onChange={(e) => updatefirstName(e.target.value)}
            />
            <br />
            <TextField
              label="Last Name"
              variant="outlined"
              onChange={(e) => updatelastName(e.target.value)}
            />
            <br />
            <TextField
              label="User Name"
              variant="outlined"
              onChange={(e) => updateUsername(e.target.value)}
            />
            <br />
            <TextField
              label="Password"
              variant="outlined"
              onChange={(e) => updatePassword(e.target.value)}
            />
            <br />
            <label>
               Select Role
            </label>

            <Select
              style={{ background: "white" }}
              value={role}
              label="Role"
              onChange={(e) => {
                updateRole(e.target.value);
              }}
              fullWidth
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
            <br />
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleCreateCustomer}
              >
                Create Customer
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
export default CreateCustomer;
