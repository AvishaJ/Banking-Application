const { Customer } = require("../../view/Customer");
const { JWTPayload } = require("../../view/Authentication.js");
async function getAllTransactions(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const { limit, pageNumber } = req.body;
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;
  
  const username = req.params.username;
  console.log(username);
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  console.log(customer);
  if (!iscustomerexist) {
    resp.status(401).send("customer doesnt exists++");
  }
  
  console.log(customer);
  resp
    .status(201)
    .send([
      customer.transactions.slice(startIndex, endIndex),
      customer.transactions.length,
    ]);
}
module.exports = { getAllTransactions };
