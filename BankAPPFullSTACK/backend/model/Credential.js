let mongoose = require("mongoose");
const CredentialSchema = mongoose.Schema(
  {
    username: { type: String },

    password: { type: String },
    credentialId: { type: String },
  },
  {
    timestamps: true,
  }
);
let CredentialModel = new mongoose.model("credentials", CredentialSchema);

module.exports = { CredentialModel };
