const Customer = require("../../view/customer")
const JWTPayload = require('../../view/authentication.js');

let [banker,message] = [null,"Already exist"];
async function createBankManager()
{
    [banker,message] = await Customer.createBankManager("Avisha","Jain","avj","123");
    return;
}

async function createCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    let {firstName, lastName,userName,password} = req.body;

    if (typeof firstName != "string") {
        resp.status(406).send("FIrst Name is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("LastName is invalid");
        return;
    }    
    
    if (typeof userName != "string") {
        resp.status(406).send("userName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("password is invalid");
        return;
    }

    let [newCustomer,message] = await banker.createNewCustomer(firstName, lastName,userName,password);
    if(newCustomer== null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newCustomer);
    return;
}

function getAllCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    const { limit, pageNumber } = req.body;
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send(Customer.allCustomers.slice(startIndex+1,endIndex+1));
    return;
}

function numberOfCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to banker")
        return;
    }
    resp.status(201).send(Customer.allCustomers.length.toString());
    return;
}

function deleteCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to Banker")
        return;
    }
    const customerId = req.body.customerId;
    let [customerIndex, isCustomerExists] = Customer.isCustomerIdExists(customerId);
    if(!isCustomerExists)
    {
        resp.status(403).send("User not Found");
        return;
    }
    (Customer.allCustomers[customerIndex].isActive == true)? (Customer.allCustomers[customerIndex].isActive = false) : (Customer.allCustomers[customerIndex].isActive = true);
    resp.status(201).send("Updated");
    return;
}

function updateCustomer(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker"){
        resp.status(401).send("please specify this role to Banker")
        return;
    }
    let userName = req.body.userName;
    let {propertyToUpdate,value} = req.body;

    if (typeof propertyToUpdate != "string") {
        resp.status(406).send("popertyToUpdate is invalid");
        return;
    }

    if (typeof value != "string") {
        resp.status(406).send("value is invalid");
        return;
    }

    let [customerIndex, isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(403).send("Customer not Found");
        return;
    }

    const isUpdate = Customer.allCustomers[customerIndex].update(propertyToUpdate,value);
    if(!isUpdate){
        resp.status(403).send("Customer not Updated")
        return;
    }
    resp.status(201).send(Customer.allCustomers[customerIndex]);
    return;
}

module.exports = {createBankManager,createCustomer,getAllCustomer,numberOfCustomer,deleteCustomer,updateCustomer};