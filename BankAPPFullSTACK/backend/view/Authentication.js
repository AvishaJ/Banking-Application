const jwt = require("jsonwebtoken");
class JWTPayload {
  static secratekey = "strongPassword";
  constructor(customer) {
    this.username = customer.credential.username;
    this.role = customer.role;
  }
  createToken() {
    return jwt.sign(JSON.stringify(this), JWTPayload.secratekey);
  }
  static verifyCookie(token) {
    return jwt.verify(token, JWTPayload.secratekey);
  }
  static isValidCustomer(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    if (!myToken) {
      resp.status(504).send("Login required");
      return false;
    }
    const newPayload = JWTPayload.verifyCookie(myToken);
    
    if (newPayload.username != req.params.username) {
      resp.status(401).send("unauthorized access");
      return false;
    }
    return true;
  }
  static isCustomerLoggedIn(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    if (!myToken) {
      resp.status(504).send("Login required");
      return false;
    }
    const newPayload = JWTPayload.verifyCookie(myToken);
    if (newPayload.username != req.params.username) {
      resp.status(401).send("unauthorized access");
      return false;
    }

    resp.status(201).send("valid Customer");
    return true;
  }
  static isValidAdmin(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    if (!myToken) {
      resp.status(504).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);
    if (newPayload.role != "admin") {
      resp.status(401).send("Admin Login Required");
      return false;
    }
    
    return true;
  }
  static isAdminLoggedIn(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    if (!myToken) {
      resp.status(504).send("Login required");
      return false;
    }

    const newPayload = JWTPayload.verifyCookie(myToken);
    if (newPayload.role != "admin") {
      resp.status(401).send("Admin Login Required");
      return false;
    }
    if (newPayload.username != req.params.username) {
      resp.status(401).send("unauthorized access");
      return false;
    }

    
    resp.status(201).send("Valid admin");
    return true;
  }
}
module.exports = { JWTPayload };
