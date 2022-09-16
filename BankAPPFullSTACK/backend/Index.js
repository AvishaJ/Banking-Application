const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { login } = require("./Controller/Login/Controller.js");
const { logout } = require("./Controller/Logout/Controller.js");
const { createBank, getAllBanks } = require("./Controller/Bank/Controller.js");
const { Customer } = require("./view/Customer");
let admin = null;
const { JWTPayload } = require("./view/Authentication");
const {
  createNewAccount,
  getAllAccounts,
} = require("./Controller/Account/Controller.js");
const {
  createCustomer,
  depositMoney,
  withdrawMoney,
  transfer,
  selfTransfer,
  getAllCustomers,
  toggleActiveFlag,
  updateCustomer,
} = require("./Controller/Customer/Controller.js");
const { getAllTransactions } = require("./Controller/Transaction/Controller");
app.use(cors());
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
async function createAdmin() {
  admin = await Customer.createCustomer(
    "avisha",
    "jain",
    "avisha",
    "avj",
    "admin"
  );
}
// app.post("/api/v1/createBank", (req, resp) => {
//   createBank(req, resp);
// });
app.post("/api/v1/login", async (req, resp) => {
  console.log("in login");
  login(req, resp);
});

app.post("/api/v1/createCustomer", async (req, resp) => {
  createCustomer(req, resp);
});
app.post("/api/v1/updateCustomer", async (req, resp) => {
  updateCustomer(req, resp);
});
app.post("/api/v1/createAccount", (req, resp) => {
  createNewAccount(req, resp);
});
app.post("/api/v1/withdrawMoney/:username", (req, resp) => {
  console.log("in with");
  withdrawMoney(req, resp);
});
app.post("/api/v1/depositMoney/:username", (req, resp) => {
  depositMoney(req, resp);
});
app.post("/api/v1/transfer/:username", (req, resp) => {
  transfer(req, resp);
});
app.post("/api/v1/selfTransfer/:username", (req, resp) => {
  selfTransfer(req, resp);
});
app.post("/api/v1/getAllCustomers", (req, resp) => {
  getAllCustomers(req, resp);
});
app.get("/api/v1/getAllAccounts/:username", (req, resp) => {
  getAllAccounts(req, resp);
});
app.get("/api/v1/getAllBanks", (req, resp) => {
  getAllBanks(req, resp);
});
app.post("/api/v1/logout", (req, resp) => {
  logout(req, resp);
});
app.post("/api/v1/toggleActiveFlag", (req, resp) => {
  toggleActiveFlag(req, resp);
});
app.post("/api/v1/isUserLoggedIn/:username", (req, resp) => {
  JWTPayload.isCustomerLoggedIn(req, resp);
});
app.post("/api/v1/getAllTransactions/:username", (req, resp) => {
  getAllTransactions(req, resp);
});
app.post("/api/v1/isAdminLoggedIn/:username", (req, resp) => {
  JWTPayload.isAdminLoggedIn(req, resp);
});
app.listen(8800, async () => {
  await createAdmin();
  console.log("app started");
});


