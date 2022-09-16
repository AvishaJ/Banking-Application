const Customer = require("../../view/customer")
const JWTPayload = require('../../view/authentication.js');

async function login(req, resp)
{
    const userName = req.body.userName;
    const password = req.body.password;
    let [indexOfUser,isCustomerExist] = Customer.findCustomer(userName);
    if(indexOfUser == -1)
    {
        resp.status(401).send("No user Exists with this userName")
        return;
    }
    let isPasswordMatch = await Customer.allCustomers[indexOfUser].comparePassword(password);
    if(!isCustomerExist || isPasswordMatch == false)
    {
        resp.status(401).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(Customer.allCustomers[indexOfUser])
    const newToken = newPayload.createToken();
    resp.cookie("mytoken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(201).send(Customer.allCustomers[indexOfUser]);
}

function validCustomer(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.userName != userName && newPayload.role != "customer"){
        resp.status(401).send("please login with correct userName")
        return;
    }
    resp.status(201).send("LoggedIN")
    return;
}

function validBanker(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    resp.status(201).send("LoggedIN")
    return;
}

module.exports = {login,validBanker,validCustomer};