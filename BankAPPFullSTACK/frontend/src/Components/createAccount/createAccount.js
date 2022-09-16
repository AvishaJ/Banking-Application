import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CreateAccount() {
  const currentUser = useParams();
  const [status, updateStatus] = useState();
  const [bankAbbre, updateBankAbbre] = useState();
  const [username, updateUsername] = useState("");
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  const [allBanks, updateAllBanks] = useState("");
  const [allCustomers, updateAllCustomers] = useState("");
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
    axios
      .post("http://localhost:8800/api/v1/getAllCustomers", {})
      .then((resp) => {
        updateAllCustomers(resp.data);
        updateUsername(resp.data[0].credential.username);
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
  const handleCreateAccount = () => {
    axios
      .post(`http://localhost:8800/api/v1/createAccount`, {
        username,
      })
      .then((resp) => {
        updateStatus("Account Created!");
      })
      .catch((error) => {
        updateStatus(error.response.data);
      });
  };

  let optionsOfAllCustomers;
  if (allCustomers != null) {
    optionsOfAllCustomers = Object.values(allCustomers).map((c) => {
      return (
        <option value={c.credential.username}>{c.credential.username}</option>
      );
    });
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <div
        style={{
          width: "100vw",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // background: "#80C2CE",
            padding: "10px"
            // paddingRight: "120px",
          }}
        >
          <form>
            <div>
              <h3>Create Account Form</h3>
            </div>
            <label >Select Username</label>
            <br />
            <select
              id="Username"
              name="Username"
              onChange={(e) => {
                updateUsername(e.target.value);
              }}
              style={{ width: "30vw", height: "40px", borderRadius:"10px"}}
            >
              {optionsOfAllCustomers}
            </select>
            <br />
            <br />

            <button
              type="button"
              class="btn btn-primary"
              onClick={handleCreateAccount}
              style={{ marginLeft: "13px" }}
            >
              Create
            </button>
            <br />
            <br />
            <div>{status}</div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateAccount;
