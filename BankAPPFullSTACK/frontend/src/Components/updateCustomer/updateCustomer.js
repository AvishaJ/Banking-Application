import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import { useLocation, useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "./updateCustomer.css";
function UpdateCustomer() {
  const currentUser = useParams();
  const location = useLocation();
  const username = location.state;
  const [value, updateValue] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("username");
  const [status, updateStatus] = useState("");
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
  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/api/v1/updateCustomer", {
        propertyToUpdate,
        value,
        username,
      })
      .then((resp) => {
        updateStatus("Customer Updated!");
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
          display: "flex",
          width: "100vw",
          height: "70vh",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // background: "#80C2CE",
            padding: "40px",
            paddingRight: "70px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form>
            <div>
              <h3>Update Customer Form</h3>
            </div>
            <label class="fw-bold">Select field to update:</label>
            <br />
            <select
              id="propertyToUpdate"
              name="propertyToUpdate"
              onChange={(e) => {
                updatePropertyToUpdate(e.target.value);
              }}
              style={{ width: "30vw", height: "40px" ,borderRadius:"10px"}}
            >
              <option value="username">Username</option>
              <option value="firstName">Firstname</option>
              <option value="lastName">Lastname</option>
            </select>
            <br />
            <br />
            <label class="fw-bold">Value:</label>
            <br />
            <input
              type="text"
              value={value}
              onChange={(e) => updateValue(e.target.value)}
              style={{ width: "30vw", height: "40px", borderRadius:"10px" }}
            ></input>
            <br />
            <br />
            <button
              class="btn btn-primary"
              onClick={handleUpdateCustomer}
            >
              Update
            </button>
            <br />
            <br />
            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateCustomer;
