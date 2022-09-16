import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { DownloadTableExcel } from "react-export-table-to-excel";
import SearchInput, { createFilter } from "react-search-input";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function GetAllCustomers() {
  const currentUser = useParams();
  const [allCustomersCount, updateAllCustomersCount] = useState(0);
  const [allCustomers, updateAllCustomers] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");

  const [loginStatus, updateLoginStatus] = useState("");
  const navigation = new useNavigate();
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

    getCustomers();
  }, [pageNumber, limit]);
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
  const handleGetAccountDetails = (c) => {
    console.log(c);
    navigation(`/adminDashboard/GetAccountDetails/${currentUser.username}`, {
      state: c,
    });
  };

  const handleUpdateCustomer = (username) => {
    navigation(`/adminDashboard/UpdateCustomer/${currentUser.username}`, {
      state: username,
    });
  };
  async function getCustomers() {
    axios
      .post("http://localhost:8800/api/v1/getAllCustomers", {
        limit,
        pageNumber,
      })
      .then((resp) => {
        let [allCust, allCustCount] = resp.data;
        updateAllCustomers(allCust);
        updateAllCustomersCount(allCustCount);
      })
      .catch((error) => {});
  }
  const toogleActiveFlag = (e) => {
    const username = e.target.id;
    console.log(username);
    axios
      .post("http://localhost:8800/api/v1/toggleActiveFlag", { username })
      .then((resp) => {
        getCustomers();
      })
      .catch((error) => {});
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  let rowOfCustomer;

  if (allCustomers != null) {
    console.log(allCustomers);
    const KEYS_TO_FILTERS = ["credential.username"];
    const filteredEmails = Object.values(allCustomers).filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );
    rowOfCustomer = filteredEmails.map((c) => {
      return (
        <tr id={c.userId}>
          <td style={{ width: "15%" }}>{c.credential.username}</td>
          <td style={{ width: "15%" }}>{c.firstName}</td>
          <td style={{ width: "15%" }}>{c.lastName}</td>
          <td style={{ width: "10%" }}>
            {c.account == null ? <p>Account Not Exists</p> : c.account.balance}
          </td>
          <td style={{ width: "12%" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleUpdateCustomer(c.credential.username)}
              style={{ width: "auto" }}
            >
              <b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
            </button>
          </td>
          <td id={c.credential.username} style={{ width: "10%" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={c.isActive}
                    onChange={toogleActiveFlag}
                    id={c.credential.username}
                  />
                }
              />
            </FormGroup>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <div>
        
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
          <label class="fw-bold">Search:</label>
          <SearchInput className="search-input" onChange={searchUpdated} />
        </div>
        
        
        <table class="table table-hover table-responsive">
          <thead >
            <tr>
              <th scope="col" style={{ width: "15%" }}>
                User Name
              </th>
              <th scope="col" style={{ width: "15%" }}>
                First Name
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Last Name
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Balance
              </th>
              <th scope="col" style={{ width: "12%" }}>
                Update Customer
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Active
              </th>
            </tr>
          </thead>
          <tbody>{rowOfCustomer}</tbody>
        </table>
        <div className="pagination" style={{ display: "inline-flex" }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(allCustomersCount / limit)}
              color="secondary"
              onChange={(e, value) => updatePageNumber(value)}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
export default GetAllCustomers;
