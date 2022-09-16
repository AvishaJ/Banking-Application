const { Customer } = require("../../view/Customer.js");
const { Bank } = require("../../view/Bank.js");
const { JWTPayload } = require("../../view/Authentication.js");

async function createNewAccount(req, resp) {
  
  const isValidAdmin = JWTPayload.isValidAdmin(req, resp);
  if (!isValidAdmin) {
    return "please login";
  }

  
  const { username } = req.body;
  
  console.log(username);
  if (username == null) {
    return resp.status(401).send("send all required parameters");
  }
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  
  if (!iscustomerexist) {
    return resp.status(401).send("customer doesnt exists");
  }
  const isAccountExists = Customer.isAccountExists(customer);
  if (isAccountExists) {
    return resp.status(401).send("Account already exists");
  }
  
  const tempAcc = await Customer.createAccount(customer);
  if (!tempAcc) {
    return resp.status(401).send("Account already exists");
  }
  
  resp.status(200).send(tempAcc);
}
async function getAllAccounts(req, resp) {
  
  const username = req.params.username;
  
  if (username == null) {
    return resp.status(401).send("send all required parameters");
  }
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  if (!iscustomerexist) {
    return resp.status(401).send("customer doesnt exists");
  }
  
  resp.status(201).send(customer.account);
}
module.exports = { createNewAccount, getAllAccounts };
