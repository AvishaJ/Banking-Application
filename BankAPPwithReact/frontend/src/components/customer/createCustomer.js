import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from '../navigation/navigation.js'
import "../customer/createCustomer.css"
function CreateCustomer() {
  const roleOfBanker = "banker"
  const userNameofBanker = useParams().userName;
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [loginStatus, updateloginStatus] = useState("")
  const [StatusOfUser, updateStatusOfUser] = useState("");

  let navigate = new useNavigate();
  const navToLogin = () => {
    navigate('/');
  };

  useEffect(() => {
    axios.post("http://localhost:8082/api/v1/isBankerLogin", {})
      .then((resp) => {
        updateloginStatus(true);
      })
      .catch((error) => {
        updateloginStatus(false);
      });
  }, []);

  const handleMySubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8082/api/v1/createCustomer", { firstName, lastName, userName, password })
      .then((resp) => {
        alert("Successfully Created");
        updateStatusOfUser("Created");
      })
      .catch((error) => {
        alert(`Error ${error.response.data}`);
        updateStatusOfUser(error.response.message);
      })
  }
  if (loginStatus === false) {
    console.log(loginStatus)
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
    )
  }
  else {
    return (
      <div>
        <div >
          <Navigation userName={userNameofBanker} role={roleOfBanker} />
        </div>
        
        <div className="container">
          <div id="admindashboardform1">
            <form id="formadmin1" onSubmit={handleMySubmit}>
              <label className="form-group">First Name :</label>
              <input type="text" className="form-control" value={firstName}
                onChange={(e) => updateFirstName(e.target.value)} ></input><br />
              <label className="form-group">Last Name :</label>
              <input type="text" className="form-control" value={lastName}
                onChange={(e) => updateLastName(e.target.value)} ></input><br />
              <label className="form-group">User Name :</label>
              <input type="text" className="form-control" value={userName}
                onChange={(e) => updateUserName(e.target.value)} ></input><br />
              <label className="form-group">Password :</label>
              <input type="text" className="form-control" value={password}
                onChange={(e) => updatePassword(e.target.value)} ></input><br />
              <button  class="button" type="submit">Create User</button><br />
              {StatusOfUser}
            </form>
          </div>
        </div>
      </div>
      // </div>
    )
  }

}
export default CreateCustomer;