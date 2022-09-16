let mongoose = require("mongoose");
const CustomerSchema = mongoose.Schema(
  {
    firstName: { type: String },

    lastName: { type: String },
    customerId: { type: String },
    totalBalance: { type: Number },
    account: { type: mongoose.SchemaTypes.ObjectId, ref: "accounts" },
    transactions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "transactions",
    },
    credential: { type: mongoose.SchemaTypes.ObjectId, ref: "credentials" },
    role: { type: String },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
let CustomerModel = new mongoose.model("customers", CustomerSchema);

module.exports = { CustomerModel };
