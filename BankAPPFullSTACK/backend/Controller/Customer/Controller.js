const { Customer } = require("../../view/Customer.js");
const { JWTPayload } = require("../../view/Authentication.js");

async function createCustomer(req, resp) {
  const { firstName, lastName, username, password, role } = req.body;
  // console.log(username + "+++");
  if (
    firstName == null ||
    lastName == null ||
    username == null ||
    password == null
  ) {
    return resp.status(401).send("send all required parameters");
  }
  let [customer, isCustomerExist] = await Customer.findCustomer(username);
  if (isCustomerExist) {
    return resp.status(401).send("Customer already exists");
  }
  const tempCustomer = await Customer.createCustomer(
    firstName,
    lastName,
    username,
    password,
    role
  );
  // console.log(tempCustomer);
  if (!tempCustomer) {
    return resp.status(401).send("Customer Already Exists");
  }
  resp.status(201).send(tempCustomer);
}
async function withdrawMoney(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    console.log("in 1");
    return "please login";
  }

  const username = req.params.username;
  const amount = parseInt(req.body.amount);
  // const bankAbbre = req.body.bankAbbre;
  if (amount == null || username == null) {
    console.log("in 2");
    return resp.status(401).send("send all required parameters");
  }
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  // console.log(indexOfCustomer);
  if (!iscustomerexist) {
    console.log("in 3");
    return resp.status(401).send("customer doesnt exists");
  }
  const isAccExists = Customer.isAccountExists(customer);
  if (!isAccExists) {
    console.log("in 4");
    return resp.status(400).send("Account doesnt exists");
  }
  // console.log(indexOfCustomer);
  // console.log(amount);
  // console.log(bankAbbre);
  // console.log(Customer.allCustomers[indexOfCustomer]);
  const withdraw = await Customer.withdrawMoney(
    username,
    amount
    // bankAbbre
  );
  if (!withdraw) {
    console.log("in fail");
    return resp.status(401).send("withdraw failed");
  }
  resp.status(200).send(String(withdraw));
  // console.log(amount, bankAbbre);
}
async function depositMoney(req, resp) {
  console.log("______________________");
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;

  const amount = parseInt(req.body.amount);
  // const bankAbbre = req.body.bankAbbre;
  if (amount == null || username == null) {
    return resp.status(400).send("send all required parameters");
  }
  // console.log(bankAbbre + "=+=+");
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  if (!iscustomerexist) {
    return resp.status(400).send("customer doesnt exists");
  }
  const isAccExists = Customer.isAccountExists(customer);
  if (!isAccExists) {
    return resp.status(400).send("Account doesnt exists");
  }
  console.log("______________________");
  console.log(customer);
  const depositMoney = await Customer.depositMoney(username, amount);
  if (!depositMoney) {
    return resp.status(401).send("Account not Exists");
  }
  resp.status(200).send("Deposit Success");
}
async function transfer(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }

  const username = req.params.username;

  const amount = parseInt(req.body.amount);
  const creditCustomerusername = req.body.creditCustomerusername;
  // const creditBankAbbre = req.body.creditBankAbbre;
  // const debitBankAbbre = req.body.debitBankAbbre;
  console.log(creditCustomerusername);
  if (
    amount == null ||
    // creditBankAbbre == null ||
    username == null ||
    creditCustomerusername == null
    // debitBankAbbre == null
  ) {
    return resp.status(400).send("send all required parameters");
  }
  // let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  // if (!iscustomerexist) {
  //   return resp.status(400).send("customer doesnt exists");
  // }
  // console.log(indexOfCustomer);
  const transferMoney = await Customer.transfer(
    amount,
    creditCustomerusername,
    username
  );
  console.log(transferMoney);
  if (!transferMoney) {
    return resp.status(400).send("transfer failed");
  }
  resp.status(200).send("transfer Success");
}
function selfTransfer(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const amount = parseInt(req.body.amount);
  const { creditCustomerId, creditBankAbbre, debitBankAbbre } = req.body;
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(401).send("customer doesnt exists++");
  }
  console.log(creditBankAbbre + "{}");
  console.log(debitBankAbbre);
  console.log(username);
  // console.log(indexOfCustomer);

  resp.status(200).send(
    Customer.allCustomers[indexOfCustomer].selfTransfer(
      amount,

      creditBankAbbre,
      debitBankAbbre
    )
  );
}
async function getAllCustomers(req, resp) {
  // const isValidAdmin = JWTPayload.isValidAdmin(req, resp);
  // if (!isValidAdmin) {
  //   return "please login";
  // }
  const { limit, pageNumber } = req.body;
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;

  const allCustomers = await Customer.getAllCustomers();
  // console.log(allCustomers);
  let tempCustomer = [];
  for (let i = 0; i < allCustomers.length; i++) {
    if (allCustomers[i].role != "admin") {
      tempCustomer.push(allCustomers[i]);
    }
  }
  if (limit == null || pageNumber == null) {
    console.log("in null");
    return resp.status(201).send(tempCustomer);
  }
  console.log(tempCustomer);
  // const { limit, pageNumber } = req.body;
  // if (limit == null || pageNumber == null || limit == "" || pageNumber == "") {
  //   return resp.status(200).send(tempCustomer);
  // }
  // console.log(limit + "{}");
  // console.log(pageNumber);
  if (tempCustomer.length === 0) {
    return resp.status(400).send("No users yet");
  }

  // let startIndex = (pageNumber - 1) * limit;
  // let endIndex = pageNumber * limit;
  // resp.status(200).send(tempCustomer.slice(startIndex, endIndex));
  resp
    .status(200)
    .send([tempCustomer.slice(startIndex, endIndex), allCustomers.length]);
}
async function toggleActiveFlag(req, resp) {
  const username = req.body.username;
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  if (!iscustomerexist) {
    return resp.status(401).send("customer not exists");
  }
  console.log("_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+__+");
  await Customer.updateCustomer(customer, "isActive", !customer.isActive);
  // Customer.allCustomers[index].isActive =
  //   !Customer.allCustomers[index].isActive;
  resp.status(201).send(!customer.isActive);
}
async function updateCustomer(req, resp) {
  const isValidAdmin = JWTPayload.isValidAdmin(req, resp);
  if (!isValidAdmin) {
    return "please login";
  }
  const { propertyToUpdate, value, username } = req.body;

  // console.log(propertyToUpdate + "__");
  // console.log(value);
  // console.log(username);
  let [customer, isCustomerExist] = await Customer.findCustomer(value);
  if (isCustomerExist) {
    return resp.status(401).send("Username Already exists");
  }
  // console.log(indexOfCustomer);
  let isUpdate = await Customer.updateCustomer(
    customer,
    propertyToUpdate,
    value
  );
  if (!isUpdate) {
    return resp.status(401).send("not updated");
  }
  resp.status(201).send("Customer Updated");
}
module.exports = {
  createCustomer,
  depositMoney,
  withdrawMoney,
  transfer,
  selfTransfer,
  getAllCustomers,
  toggleActiveFlag,
  updateCustomer,
};
