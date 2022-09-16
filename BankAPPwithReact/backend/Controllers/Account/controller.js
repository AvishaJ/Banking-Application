const Customer = require("../../view/customer")
const JWTPayload = require('../../view/authentication.js');
function createNewAccount(req,resp)
{
    let newCustomer = req.params.newCustomer;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != newCustomer){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let bankAbbrevation = req.body.bankAbbrevation;

    if (typeof bankAbbrevation != "string") {
        resp.status(406).send("BankAbbrevation is invalid");
        return;
    } 
    let [isNewAccount,message] = Customer.createnewAccount(bankAbbrevation,newCustomer);
    if(isNewAccount == null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(isNewAccount);
    return;
}

function getAllAccount(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker")
    {
        if(newPayload.userName != userName)
        {
            resp.status(401).send("Login with your correct ID")
            return;
        }
        let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
        if(flag== false)
        {
            resp.status(403).send(message);
            return;
        }    
        const { limit, pageNumber } = req.body;
        let startIndex = (pageNumber - 1) * limit;
        let endIndex = pageNumber * limit;
        resp.status(201).send(allAccount.slice(startIndex,endIndex));
        return;
    }
    let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
    if(flag== false)
    {
        resp.status(403).send(message);
        return;
    }
    const { limit, pageNumber } = req.body;
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send(allAccount.slice(startIndex,endIndex));
    return;
}

function numberOfAccount(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "banker")
    {
        if(newPayload.userName != userName)
        {
            resp.status(401).send("Login with your correct ID")
            return;
        }
        let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
        if(flag== false)
        {
            resp.status(403).send(message);
            return;
        }
        resp.status(201).send(allAccount.length.toString());
        return;
    }
    let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
    if(flag== false)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(allAccount.length.toString());
    return;
}

function withDraw(req,resp)
{
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,debitBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof debitBankAbbrevation != "string") {
        resp.status(406).send("debitCardAbbrevation is invalid");
        return;
    }    

    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].withdraw(amount,debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

function deposit(req,resp)
{
    
    let userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != userName){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,creditBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof creditBankAbbrevation != "string") {
        resp.status(406).send("creditBankAbbrevation is invalid");
        return;
    } 

    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].deposit(amount,creditBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

function transfer(req,resp)
{
    let debitCustomer = req.params.debitCustomer;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != debitCustomer){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let {amount,creditCustomer,creditBankAbbrevation} = req.body;
    let debitBankAbbrevation = req.params.debitBankAbbrevation;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof creditBankAbbrevation != "string") {
        resp.status(406).send("crditCardAbbrevation is invalid");
        return;
    } 
    
    if (typeof debitBankAbbrevation != "string") {
        resp.status(406).send("DebitCardAbbrevation is invalid");
        return;
    }

    if (typeof creditCustomer != "string") {
        resp.status(406).send("crditCustomer is invalid");
        return;
    } 
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(debitCustomer);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amount, creditCustomer, creditBankAbbrevation, debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

function selftransfer(req,resp)
{
    let creditCustomer  = req.params.creditCustomer;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.userName != creditCustomer){
        resp.status(401).send("Login with Correct ID")
        return;
    }
    let debitBankAbbrevation = req.params.debitBankAbbrevation;
    let {amount,creditBankAbbrevation} = req.body;

    if (typeof amount != "number") {
        resp.status(406).send("Amount is invalid");
        return;
    }

    if (typeof creditBankAbbrevation != "string") {
        resp.status(406).send("crditCardAbbrevation is invalid");
        return;
    } 

    if (typeof debitBankAbbrevation != "string") {
        resp.status(406).send("debitCardAbbrevation is invalid");
        return;
    }

    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(creditCustomer);
    if(!isCustomerExists)
    {
        resp.status(403).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amount, creditCustomer, creditBankAbbrevation, debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

module.exports = {createNewAccount,getAllAccount,numberOfAccount,withDraw,deposit,transfer,selftransfer};