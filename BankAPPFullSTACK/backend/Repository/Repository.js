let { CredentialModel } = require("../model/Credential");
let { CustomerModel } = require("../model/Customer");
let mongoose = require("mongoose");
const { AccountModel } = require("../model/Account");
const { TransactionModel } = require("../model/Transaction");
const url = "mongodb://127.0.0.1:27017/BankApp";
class DatabaseMongoose {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(url)
      .then(() => {
        ("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
  async insertOneCredential(credential) {
    try {
      let newRecord = await CredentialModel.create(credential);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async insertOneCustomer(user) {
    try {
      let newRecord = await CustomerModel.create(user);
      // console.log(newRecord);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneCustomer(CredId) {
    try {
      let record = await CustomerModel.findOne({ credential: CredId })
        .populate("credential")
        .populate("account")
        .populate("transactions");
      
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findOneCredential(username) {
    try {
      let record = await CredentialModel.findOne({ username: username });
      // console.log(record);
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async findAccount(account) {}
  async getAllCustomers() {
    try {
      let record = await CustomerModel.find()
        .populate("credential")
        .populate("account");
      // console.log(record);
      return record;
    } catch (e) {
      console.log(e.message);
    }
  }
  async insertOneAccount(account) {
    try {
      let newRecord = await AccountModel.create(account);
      // console.log(newRecord);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateAccountOfCustomer(customer, account) {
    try {
      let updatedUser = await CustomerModel.updateOne(
        { _id: customer._id },
        { $set: { account: account } }
      );
      return updatedUser;
    } catch (e) {
      console.log(e.message);
    }
  }
  async insertOneTransaction(transaction) {
    try {
      let newRecord = await TransactionModel.create(transaction);
      // console.log(newRecord);
      return newRecord;
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateTransactionOfCustomer(customer, transactionId) {
    try {
      let updatedUser = await CustomerModel.updateOne(
        { _id: customer._id },
        { $push: { transactions: transactionId } }
      );
      return updatedUser;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateBalance(accountId, ammount) {
    try {
      let updatedBalance = await AccountModel.updateOne(
        { _id: accountId },
        { $inc: { balance: ammount } }
      );
      return updatedBalance;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateCredential(credentialId, propertyToUpdate, value) {
    try {
      let updatedCred = await CredentialModel.update(
        { _id: credentialId },
        { $set: { [propertyToUpdate]: value } }
      );
      return updatedCred;
    } catch (e) {
      console.log(e.message);
    }
  }
  async updateCustomer(id, propertyToUpdate, value) {
    try {
      if (propertyToUpdate == "username") {
        let user = await CustomerModel.findOne({ _id: id });
        let credentialId = user.credential._id;
        let updatedCred = this.updateCredential(
          credentialId,
          propertyToUpdate,
          value
        );
        return updatedCred;
      }
      let updatedUser = await CustomerModel.update(
        { _id: id },
        { $set: { [propertyToUpdate]: value } }
      );
      return updatedUser;
    } catch (e) {
      console.log(e.message);
    }
  }
}
module.exports = { DatabaseMongoose };
