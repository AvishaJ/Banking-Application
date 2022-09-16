let mongoose = require("mongoose");
const AccountSchema = mongoose.Schema(
  {
    accountId: { type: String },
    accountNo: { type: Number },
    balance: { type: Number },
  },
  {
    timestamps: true,
  }
);
let AccountModel = new mongoose.model("accounts", AccountSchema);

module.exports = { AccountModel };
