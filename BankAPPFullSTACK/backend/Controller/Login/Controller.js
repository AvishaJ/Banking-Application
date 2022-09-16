const { Customer } = require("../../view/Customer.js");
const { JWTPayload } = require("../../view/Authentication.js");
const { Credential } = require("../../view/Credential.js");
async function login(req, resp) {
  const { username, password } = req.body;
  if (password == null || username == null) {
    resp.status(200).send("send all required parameters");
  }
  let [customer, isCustomerExists] = await Customer.findCustomer(username);
  console.log(customer);
  if (
    !isCustomerExists ||
    !(await Credential.comparePassword(
      password,
      customer.credential.password
    )) ||
    !customer.isActive
  ) {
    resp.status(504).send("Invalid Credentials");
    return;
  }
  const newPayload = new JWTPayload(customer);
  const newToken = newPayload.createToken();
  resp.cookie("myToken", newToken);

  resp.status(200).send(customer);
}
module.exports = { login };
