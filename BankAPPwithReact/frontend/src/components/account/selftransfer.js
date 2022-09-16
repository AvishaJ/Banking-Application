import React, { useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate } from "react-router-dom";
import Navigation from '../navigation/navigation.js'
function SelfTransfer() 
{
    const role = "customer"
    const creditCustomer = useParams().userName;
    const debitBankAbbrevation = useParams().bank;
    const [creditBankAbbrevation,updatecreditBankAbbrevation] = useState("");
    const [amount1,updateAmount] = useState(0);
    const [loginStatus, updateloginStatus] = useState("")
    const [StatusOfUser,updateStatusOfUser] = useState("");
    
    let navigate = new useNavigate();
    const navToLogin = () => {
        navigate('/');
      };

      useEffect(() => {
        axios.post(`http://localhost:8082/api/v1/isCustomerLogin/${creditCustomer}`,{})
          .then((resp) => {
            updateloginStatus(true);
          })
          .catch((error) => {
            updateloginStatus(false);
          });
    }, []);

    const handleMySubmit = async (e) => {
            e.preventDefault();
            const amount =  parseInt(amount1)
            await axios.post(`http://localhost:8082/api/v1/selftransfer/${creditCustomer}/${debitBankAbbrevation}`,{amount,creditBankAbbrevation})
            .then((resp)=>{
                alert(resp.data);
                updateStatusOfUser("Created");
            })
            .catch((error)=>{
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
              <p style={{ color: "white", fontSize: "30px" , background : "red"}}>
              Please login to continue
              </p>
              <button onClick={navToLogin} type="submit" className="btn btn-primary" style={{ backgroundColor: "green" ,fontSize : "30px"}}>Login</button><br />
            </div>
          </>
        )
    }
    else {
        return (
            <div>
                <div >
                    <Navigation userName={creditCustomer} role={role} />
                </div> 
                    <div className="container">
                    <div id="admindashboardform">
                           
                                <form id="formadmin" onSubmit={handleMySubmit}>
                                <label  className="form-group">Bank :</label>
                                <input type= "text" className="form-control" value = {creditBankAbbrevation}
                                  onChange={(e) => updatecreditBankAbbrevation(e.target.value)} ></input><br />
                                <label  className="form-group">Amount :</label>
                                <input type= "number" className="form-control" value = {amount1}
                                  onChange={(e) => updateAmount(e.target.value)} ></input><br />
                                <button type="submit" className="button">Self Transfer</button><br />
                                {StatusOfUser}
                                </form>
                            </div>
                        </div>
                    </div>
                
        )
    }

}
export default SelfTransfer;