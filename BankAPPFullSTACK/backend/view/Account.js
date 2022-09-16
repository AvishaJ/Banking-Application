const uuid = require("uuid");
const { Bank } = require("../view/Bank");
class Accounts {
  static accountNo = 1;
  static allAccounts = [];
  constructor(bank) {
    // this.bank = bank;
    this.accountNo = Accounts.accountNo++;
    this.balance = 1000;
    this.accountId = uuid.v4();
  }
  isAccountExists(bankAbbre) {
    console.log(Bank.allBanks);
    if (this.bank.bankAbbre == bankAbbre) {
      return true;
    }
    return false;
  }
}
module.exports = { Accounts };
