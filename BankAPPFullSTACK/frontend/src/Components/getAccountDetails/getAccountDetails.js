import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function GetAccountDetails() {
  const location = useLocation();
  const currentUser = useParams();
  const c = location.state;
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
  let rowOfAccounts = Object.values(c.accounts).map((c) => {
    return (
      <>
        {
          <>
            <tr>
              <td>{c.bank.bankName}</td>
              <td>{c.bank.bankAbbre}</td>
              <td>{c.balance}</td>
            </tr>
          </>
        }
      </>
    );
  });

  return (
    <>
      <NavBar username={currentUser.username} />
      <table class="table table-striped">
        <thead>
          <tr>
            <th>BankName</th>
            <th>Bank Abbrevation</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{rowOfAccounts}</tbody>
      </table>
    </>
  );
}
export default GetAccountDetails;
