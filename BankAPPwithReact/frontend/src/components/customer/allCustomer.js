import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../navigation/navigation";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


function AllCustomer() {
  const User = useParams().userName
  const [allCustomer, updateallCustomer] = useState({});
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [loginStatus, updateloginStatus] = useState("")
  const [allCustomerCount, updateallCustomerCount] = useState(0);
  let navigate = new useNavigate();
  const navToLogin = () => {
    navigate('/');
  };

  const toggleCustomer = (e) => {
    let customerId = e.target.id;
    axios
      .post("http://localhost:8082/api/v1/deleteCustomer", { customerId })
      .then((resp) => {
        updateallCustomer(resp.data);
      })
      .catch((error) => { });
  };

  function getNumberOfCustomer() {
    axios
      .get("http://localhost:8082/api/v1/numberOfCustomer")
      .then((resp) => {
        updateallCustomerCount(parseInt(resp.data));
      })
      .catch((error) => { });
  }

  useEffect(() => {
    axios.post("http://localhost:8082/api/v1/isBankerLogin", {})
      .then((resp) => {
        updateloginStatus(true);
      })
      .catch((error) => {
        updateloginStatus(false);
      });
    getCustomer();
    getNumberOfCustomer();
  }, [pageNumber, limit, allCustomer]);

  function getCustomer() {
    axios
      .post("http://localhost:8082/api/v1/getAllCustomer", { limit, pageNumber })
      .then((resp) => {
        updateallCustomer(resp.data);
        updateloginStatus(true);
      })
      .catch((error) => {
      });
  }

  let rowOfUser;

  if (allCustomer != null) {
    let index = 0;
    rowOfUser = Object.values(allCustomer).map((u) => {
      index += 1;
      return (

        <tr id={u.customerID}>
          <td>{index}</td>
          <td>{u.credentials.userName}</td>
          <td>{u.fullName}</td>
          <td>{u.role}</td>
          <td id={u.customerID}>
            <FormGroup>

              <FormControlLabel
                control={
                  <Switch

                    checked={u.isActive}
                    onChange={toggleCustomer}
                    id={u.customerID}
                  />

                }
              />
            </FormGroup>
          </td>

          <td>{u.totalBalance}</td>
          <td>
            <a href={`updateCustomer/${User}/${u.credentials.userName}`}>
              <button className="btn btn-primary"  > ↻ </button>
            </a>
          </td>
          <td>
            <a href={`allAccount1/${User}/${u.credentials.userName}`}>
              <button className="btn btn-primary">👁</button>
            </a>
          </td>
        </tr>
      );
    });
  }
  if (!loginStatus) {
    return (
      <>
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
          <p style={{ color: "white", fontSize: "30px", background: "red" }}>
          Please login to continue
          </p>
          <button onClick={navToLogin} type="submit" className="btn btn-primary" style={{ backgroundColor: "green", fontSize: "30px" }}>Login</button><br />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="fill-window">
        <NavBar userName={User} role={"banker"} />
        <div>
          <div className="pagination">
            <label className="fw-bold" style={{ color: 'blue' }} >limit:</label>
            <select
              id="role"
              name="role"
              onChange={(e) => {
                updateLimit(e.target.value);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

        </div>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Username</th>
                <th scope="col">FullName</th>
                <th scope="col">Role</th>
                <th scope="col">IsActive</th>
                <th scope="col">TotalBalance</th>
                <th scope="col">Update</th>
                <th scope="col">Accounts</th>
              </tr>
            </thead>
            <tbody>{rowOfUser}</tbody>
          </table>
        </div>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(allCustomerCount / limit)}
              color="primary"
              onChange={(e, value) => updatePageNumber(value)}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
export default AllCustomer;