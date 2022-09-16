import axios from "axios"
import React, { useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
function Login() {
    const navigation = new useNavigate();
    const [password, updatePassword] = useState("");
    const [userName, updateUsername] = useState("");
    const [loginStatus, updateloginStatus] = useState("");
    const handleMyLogin = async (e) => {
        if (userName !== "" && password !== "") {
            e.preventDefault();
            await axios.post("http://localhost:8082/api/v1/login", { userName, password })
                .then((resp) => {
                    if (resp.data.role === "banker") {
                        navigation(`/bankerDashboard/${userName}`)
                    }
                    else {
                        navigation(`/customerDashboard/${userName}`)
                    }
                })
                .catch((error) => {
                    alert(`Error ${error.response.data}`);
                    updateloginStatus('Invalid Credentials')
                })
        }

    }

    return (
        <> 
        <div>
        <div className="container">
            <div id="admindashboardform">
                <form id="formadmin"  onSubmit={handleMyLogin}>
                <h2 >Banking Application</h2>
                        <label className="form-group" >Username:</label>
                        <input type="text" className="form-control" value={userName}
                            onChange={(e) => updateUsername(e.target.value)} ></input><br />

                        <label className="form-group">Password:</label>
                        <input type="text" value={password} className="form-control"
                            onChange={(e) => updatePassword(e.target.value)}></input><br />

                        <button type="submit" class="button" >Login</button><br />
                        {loginStatus}

                </form>
            </div>
            </div>
            </div>
        </>
    )
}

export default Login;

