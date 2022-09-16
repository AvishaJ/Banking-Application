class Transaction {
  static allTransactions = [];
  constructor(type, amount, paye, totalBalance) {
    this.type = type;
    this.amount = amount;
    this.paye = paye;

    this.totalBalance = totalBalance;
  }
  static createNewTransaction(type, amount, paye, totalBalance) {
    const newTransaction = new Transaction(
      type,
      amount,
      paye,

      totalBalance
    );
    return newTransaction;
  }
}
module.exports = { Transaction };
