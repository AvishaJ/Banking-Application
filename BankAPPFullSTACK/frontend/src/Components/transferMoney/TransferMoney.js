import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import { useParams } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function TransferMoney() {
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  const currentUser = useParams();
  const [status, updateStatus] = useState("");
  const [amount, updateAmount] = useState("");
  const [creditCustomerusername, updateCreditCustomerusername] = useState("");
  const [creditBankAbbre, updateCreditBankAbbre] = useState("");
  const [debitBankAbbre, updateDebitBankAbbre] = useState("");
  const [allDebitAccounts, updateAllDebitAccounts] = useState("");
  const [allCreditAccounts, updateAllCreditAccounts] = useState("");
  const [allCreditCustomers, updateAllCreditCustomers] = useState("");

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`,
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
      .post(`http://localhost:8800/api/v1/getAllCustomers`)
      .then((resp) => {
        console.log(resp.data);
        let tempCust = [];
        for (let i = 0; i < resp.data.length; i++) {
          if (resp.data[i].credential.username != currentUser.username) {
            tempCust.push(resp.data[i]);
          }
        }
        updateAllCreditCustomers(tempCust);

        updateCreditCustomerusername(resp.data[0].credential.username);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    
  }, []);
 
  let optionsOfCreditCustomers;
  if (allCreditCustomers != null) {
    optionsOfCreditCustomers = Object.values(allCreditCustomers).map((a) => {
      return (
        <option value={a.credential.username}>{a.credential.username}</option>
      );
    });
  }
  
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
  const handleTransferMoney = () => {
    axios
      .post(`http://localhost:8800/api/v1/transfer/${currentUser.username}`, {
        amount,
        creditCustomerusername,
      })
      .then((response) => {
        updateStatus("Transfer Successfull!");
      })
      .catch((error) => {
        updateStatus(error.response.data);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
      <div
        style={{
          width: "100vw",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <div style={{padding: "40px" }}>
          <form style={{ width: "35vw" }}>
            <div>
              <h3>Transfer Money</h3>
            </div>
            <TextField
              style={{ width: "30vw", height: "40px" }}
              label="Enter Amount"
              placeholder=""
              variant="outlined"
              onChange={(e) => updateAmount(e.target.value)}
            />
            <br /> <br />
            
            <label class="fw-bold">Credit Customer Username</label>
            <br />
            <select
              id="BankAbbrevation"
              name="BankAbbrevation"
              style={{ width: "30vw", height: "40px" ,borderRadius:"10px"}}
              onChange={(e) => {
                updateCreditCustomerusername(e.target.value);
              }}
            >
              {optionsOfCreditCustomers}
            </select>
            
            <br />
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleTransferMoney}
              >
                Transfer
              </button>
            </Box>
            <br />
            <br />
            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default TransferMoney;
