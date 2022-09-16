import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import { useParams } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function SelfTransfer() {
  const currentUser = useParams();
  const [status, updateStatus] = useState("");
  const [amount, updateAmount] = useState("");
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  const [creditBankAbbre, updateCreditBankAbbre] = useState("");
  const [allDebitAccounts, updateAllDebitAccounts] = useState("");
  const [debitBankAbbre, updateDebitBankAbbre] = useState("");
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
      .get(
        `http://localhost:8800/api/v1/getAllAccounts/${currentUser.username}`
      )
      .then((resp) => {
        updateAllDebitAccounts(resp.data);

        updateDebitBankAbbre(resp.data[0].bank.bankAbbre);
        updateCreditBankAbbre(resp.data[0].bank.bankAbbre);
      })
      .catch((error) => {
        console.log(error.response.data);
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
  let optionsOfBankAbbrevation;
  if (allDebitAccounts != null) {
    optionsOfBankAbbrevation = Object.values(allDebitAccounts).map((a) => {
      return <option value={a.bank.bankAbbre}>{a.bank.bankAbbre}</option>;
    });
  }
  const handleTransferMoney = () => {
    axios
      .post(
        `http://localhost:8800/api/v1/selfTransfer/${currentUser.username}`,
        {
          amount,

          creditBankAbbre,
          debitBankAbbre,
        }
      )
      .then((response) => {
        updateStatus(<Alert severity="success">Transfer Successfull!</Alert>);
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
        <div style={{ background: "#80C2CE", padding: "40px" }}>
          <form style={{ width: "35vw" }}>
            <TextField
              label="ammount"
              placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updateAmount(e.target.value)}
              style={{ width: "30vw", height: "40px" }}
            />
            <br />
            <br />

            {/* <TextField
          label="Credit Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateCreditBankAbbre(e.target.value)}
        /> */}
            <label class="fw-bold">Debit Bank Abbrevation</label>
            <br />
            <select
              id="BankAbbrevation"
              name="BankAbbrevation"
              onChange={(e) => {
                updateCreditBankAbbre(e.target.value);
              }}
              style={{ width: "30vw", height: "40px" }}
            >
              {optionsOfBankAbbrevation}
            </select>
            {/* <TextField
          label="Debit Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateDebitBankAbbre(e.target.value)}
        /> */}
            <label class="fw-bold">Debit Bank Abbrevation</label>
            <br />
            <select
              id="BankAbbrevation"
              name="BankAbbrevation"
              onChange={(e) => {
                updateDebitBankAbbre(e.target.value);
              }}
              style={{ width: "30vw", height: "40px" }}
            >
              {optionsOfBankAbbrevation}
            </select>
            <br />
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleTransferMoney}
              >
                Transfer money
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
export default SelfTransfer;
