import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";
import Navigation from '../navigation/navigation'
function UpdateCustomer()
{
    const role = "banker";
    const user = useParams().user;
    const userName = useParams().userName;
    const [propertyToUpdate,updatepropertToUpdate] = useState("");
    const [value,updateValue] = useState("");
    const [loginStatus, updateloginStatus] = useState("")
    const [StatusOfUser,updateStatusOfUser] = useState("");

    let navigate = new useNavigate();
    const navToLogin = () => {
        navigate('/');
      };

    useEffect(() => {
        axios.post("http://localhost:8082/api/v1/isBankerLogin",{})
          .then((resp) => {
            updateloginStatus(true);
          })
          .catch((error) => {
            updateloginStatus(false);
          });
    }, []);

    const onUpdateUser = async (e) =>{
        e.preventDefault()
        await axios.put(`http://localhost:8082/api/v1/updateCustomer`,{userName,propertyToUpdate,value})
        .then((resp)=>{
            alert("Successfully Updated");
            updateStatusOfUser("Updated");
        })
        .catch((error)=>{
            alert(`Error ${error.response.data}`);
            updateStatusOfUser(error.response.message);
        })     
    }

    if (!loginStatus) {
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
                    <Navigation userName={user} role={role} />
                </div> 
                    <div className="container">
                        
                            
                    <div id="admindashboardform">
                                <form id="formadmin" onSubmit={onUpdateUser}>
                                    <label  className="form-group">property To Update:</label>
                                    <input type= "text" className="form-control" value = {propertyToUpdate}
                                    onChange={(e) => updatepropertToUpdate(e.target.value)} ></input><br />
                                    <label  className="form-group">Value To be Update:</label>
                                    <input type= "text" className="form-control" value = {value}
                                    onChange={(e) => updateValue(e.target.value)} ></input><br />
                                    <button type="submit" className="button" >Update User</button><br />
                                    {StatusOfUser}
                                </form>
                            </div>
                        </div>
                    </div>
               
        )
    }

}
export  default UpdateCustomer;