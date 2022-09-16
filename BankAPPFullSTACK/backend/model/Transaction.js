let mongoose = require("mongoose");
const TransactionSchema = mongoose.Schema(
  {
    type: { type: String },

    amount: { type: Number },
    paye: { type: String },

    totalBalance: { type: Number },
  },
  {
    timestamps: true,
  }
);
let TransactionModel = new mongoose.model("transactions", TransactionSchema);

module.exports = { TransactionModel };
