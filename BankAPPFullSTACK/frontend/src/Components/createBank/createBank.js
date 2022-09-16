import axios from "axios";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import { useState } from "react";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CreateBank() {
  const [bankName, updateBankName] = useState("");
  const [bankAbbre, updateBankAbbre] = useState("");
  const [status, updateStatus] = useState("");
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
  const handleCreateBank = () => {
    axios
      .post("http://localhost:8800/api/v1/createBank", { bankName, bankAbbre })
      .then((resp) => {
        updateStatus(<Alert severity="success">Bank Created!</Alert>);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
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
        <div
          style={{
            background: "#80C2CE",

            padding: "40px",
          }}
        >
          <form style={{ width: "30vw" }}>
            <TextField
              label="BankName"
              placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updateBankName(e.target.value)}
            />
            <br />
            <TextField
              label="Bank Abbrevation"
              placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updateBankAbbre(e.target.value)}
            />
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleCreateBank}
              >
                Create Bank
              </button>
              {/* <Button variant="solid" color="primary" onClick={handleLogin}>
                Submit
              </Button> */}
            </Box>
            <br />
            <br />
            <div>{status}</div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateBank;
