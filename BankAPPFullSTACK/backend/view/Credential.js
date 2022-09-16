const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { DatabaseMongoose } = require("../Repository/Repository");
class Credential {
  static allCredentials = [];
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.credentialId = uuid.v4();
  }
  static findUser(username) {
    
    for (let index = 0; index < Credential.allCredentials.length; index++) {
      if (Credential.allCredentials[index].username == username) {
        return [true, index];
      }
    }
    return [false, -1];
  }
  async getHashOfPassword() {
    return bcrypt.hash(this.password, 10);
  }
  static async comparePassword(password, encyptedPassword) {
    return await bcrypt.compare(password, encyptedPassword);
  }
  static async createCredential(username, password) {
    let [isUserExists, indexOfUser] = Credential.findUser(username);
    if (isUserExists) {
      return [false, "userName Already Exist", null];
    }
  
    let newCredential = new Credential(username, password);
    newCredential.password = await newCredential.getHashOfPassword();
    const dbs = new DatabaseMongoose();
    const cred = await dbs.insertOneCredential(newCredential);

    Credential.allCredentials.push(newCredential);
    return [true, "Credential Created", cred._id];
  }
}
module.exports = { Credential };
