const { Bank } = require("../../view/Bank.js");
const { JWTPayload } = require("../../view/Authentication");
function createBank(req, resp) {
  // console.log("+++++++++++++++");
  // console.log(Bank.allBanks);
  const { bankName, bankAbbre } = req.body;
  if (
    bankName == null ||
    // bankAbbre == null ||
    bankName == ""
    // bankAbbre == ""
  ) {
    resp.status(401).send("send all required parameters");
  }
  if (!JWTPayload.isValidAdmin(req, resp)) {
    return resp.status(401).send("unAuthorized access");
  }
  let bank = Bank.createBank(bankName, bankAbbre);
  if (!bank) {
    return resp.status(400).send("Bank Already exists");
  }
  resp.status(200).send(bank);
}
function getAllBanks(req, resp) {
  resp.status(200).send(Bank.getAllBanks());
}
module.exports = { createBank, getAllBanks };
