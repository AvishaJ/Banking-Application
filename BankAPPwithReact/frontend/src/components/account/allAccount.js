import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../navigation/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


function AllAccount() {
    const User = useParams().userName
    const [allAccount, updateallAccount] = useState({});
    const [pageNumber, updatePageNumber] = useState(1);
    const [limit, updateLimit] = useState(5);
    const [loginStatus, updateloginStatus] = useState("")
    const [allAccountCount, updateallAccountCount] = useState(0);
    let navigate = new useNavigate();
    const navToLogin = () => {
      navigate('/');
    };

    function getNumberOfBanks() {
      axios
        .get(`http://localhost:8082/api/v1/numberOfAccounts/${User}`)
        .then((resp) => {
          updateallAccountCount(parseInt(resp.data));
        })
        .catch((error) => {});
    }

    useEffect(() => {
      axios.post(`http://localhost:8082/api/v1/isCustomerLogin/${User}`,{})
        .then((resp) => {
          updateloginStatus(true);
        })
        .catch((error) => {
          updateloginStatus(false);
        });
        getBank();
        getNumberOfBanks();
    }, [pageNumber, limit, allAccount]);
  
    function getBank(){
      axios
        .post(`http://localhost:8082/api/v1/UserAllAccount/${User}`, { limit, pageNumber })
        .then((resp) => {
          updateallAccount(resp.data);
          updateloginStatus(true);
        })
        .catch((error) => {
        });
      }
    
    let rowOfUser;
    if (allAccount != null) {
      let index=0;
        rowOfUser = Object.values(allAccount).map((u) => {
          index+=1;
            return (
              <tr id={u.bankId}>
                <td>{index}</td>
                <td>{u.bankAbbrevation}</td>
                <td>{u.balance}</td>
                <td>
                <a href={`deposit/${User}/${u.bankAbbrevation}`}>
                  <button className="btn btn-primary">⍖</button>
                  </a>
                </td>
                <td>
                <a href={`withDraw/${User}/${u.bankAbbrevation}`}>
                  <button className="btn btn-primary"  >⍏</button>
                  </a>
                </td>
                <td>
                <a href={`transfer/${User}/${u.bankAbbrevation}`}>
                  <button className="btn btn-primary" >⍆</button>
                  </a>
                </td>
                <td>
                <a href={`selfTransfer/${User}/${u.bankAbbrevation}`}>
                  <button className="btn btn-primary" >⍗</button>
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
              <p style={{ color: "white", fontSize: "30px" , background : "red"}}>
                Please login to continue
              </p>
              <button onClick={navToLogin} type="submit" className="btn btn-primary" style={{ backgroundColor: "green" ,fontSize : "30px"}}>Login</button><br />
            </div>
          </>
        );
      }
      return (
        <>
        <div className="fill-window"> 
          <NavBar userName={User} role={"customer"} />
          <div>
            <div className="pagination">
              <label className="fw-bold">Limit:</label>
              <select
                id="role"
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
            <table className ="table table-striped">
              <thead >
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Deposit</th>
                  <th scope="col">Withdraw</th>
                  <th scope="col">Transfer</th>
                  <th scope="col">Self Transfer</th>
                </tr>
              </thead>
              <tbody>{rowOfUser}</tbody>
            </table>
          </div>
          <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(allAccountCount/limit)}
                  color="primary"
                  onChange={(e, value) => updatePageNumber(value)}
                />
              </Stack>
            </div>
          </div>
        </>
      );
}
export default AllAccount;