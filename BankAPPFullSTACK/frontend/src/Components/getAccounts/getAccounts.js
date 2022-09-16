import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function GetAccounts() {
  const currentUser = useParams();
  const tableRef = useRef(null);
  const [accounts, updateAccounts] = useState([]);
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [allAccountsCount, updateAllAccountsCount] = useState(0);
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
      .post(
        `http://localhost:8800/api/v1/getAllTransactions/${currentUser.username}`,
        { limit, pageNumber }
      )
      .then((resp) => {
        // console.log(resp);
        let [allAccs, allAccsCount] = resp.data;
        updateAccounts(allAccs);
        console.log(allAccs);
        updateAllAccountsCount(allAccsCount);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [limit, pageNumber]);

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

  let rowOfAccounts = Object.values(accounts).map((c) => {
    return (
      <>
        {
          <>
            <tr>
              <td>{c.type}</td>
              <td>{c.paye}</td>
              <td>{c.amount}</td>
              <td>
                {c.updatedAt.split("T")[0].split("-").reverse().join("-")}
              </td>
              <td>{c.totalBalance}</td>
            </tr>
          </>
        }
      </>
    );
  });

  return (
    <>
      <NavBar username={currentUser.username} />
      <br />
      <div className="pagination" style={{ display: "inline-flex" }}>
        <label class="fw-bold">limit:</label>
        <select
          style={{ width: "140px" }}
          id="role"
          name="role"
          onChange={(e) => {
            updateLimit(e.target.value);
            updatePageNumber(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <DownloadTableExcel
        filename="statement"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <button type="button" class="btn btn-primary">
         &nbsp;&nbsp;&nbsp;Print&nbsp;&nbsp;&nbsp;
        </button>
      </DownloadTableExcel>
      <br />
      <br />
      <table class="table table-hover table-responsive" ref={tableRef}>
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Total Balance</th>
          </tr>
        </thead>
        <tbody>{rowOfAccounts}</tbody>
      </table>
      <div className="pagination" style={{ display: "inline-flex" }}>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(allAccountsCount / limit)}
            color="primary"
            onChange={(e, value) => updatePageNumber(value)}
          />
        </Stack>
      </div>
    </>
  );
}
export default GetAccounts;
