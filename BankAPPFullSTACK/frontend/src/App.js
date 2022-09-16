import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Login from "./Components/Login/login";
import AdminDashboard from "./Components/AdminDashboard/adminDashboard";
import CreateBank from "./Components/createBank/createBank";
import CreateCustomer from "./Components/createCustomer/createCustomer";
import UserDashboard from "./Components/userDashboard/userDashboard";
import GetAllCustomers from "./Components/getAllCustomers/getAllCustomers";
import CreateAccount from "./Components/createAccount/createAccount";
import DepositMoney from "./Components/depositMoney/depositMoney";
import WithdrawMoney from "./Components/withdrawMoney/withdrawMoney";
import TransferMoney from "./Components/transferMoney/TransferMoney";
import SelfTransfer from "./Components/selfTransfer/selfTransfer";
import GetAccountDetails from "./Components/getAccountDetails/getAccountDetails";
import UpdateCustomer from "./Components/updateCustomer/updateCustomer";
import GetAccounts from "./Components/getAccounts/getAccounts";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/adminDashboard" element={<AdminDashboard />} />
      <Route
        exact
        path="/adminDashboard/createBank/:username"
        element={<CreateBank />}
      />
      <Route
        exact
        path="/adminDashboard/createCustomer/:username"
        element={<CreateCustomer />}
      />
      <Route
        exact
        path="/userDashboard/:username"
        element={<UserDashboard />}
      />
      <Route
        exact
        path="/adminDashboard/getAllCustomers/:username"
        element={<GetAllCustomers />}
      />
      <Route
        exact
        path="/userDashboard/createAccount/:username"
        element={<CreateAccount />}
      />
      <Route
        exact
        path="/userDashboard/depositMoney/:username"
        element={<DepositMoney />}
      />
      <Route
        exact
        path="/userDashboard/withdrawMoney/:username"
        element={<WithdrawMoney />}
      />
      <Route
        exact
        path="/userDashboard/transferMoney/:username"
        element={<TransferMoney />}
      />
      <Route
        exact
        path="/userDashboard/selfTransfer/:username"
        element={<SelfTransfer />}
      />
      <Route
        exact
        path="/adminDashboard/GetAccountDetails/:username"
        element={<GetAccountDetails />}
      />
      <Route
        exact
        path="/adminDashboard/UpdateCustomer/:username"
        element={<UpdateCustomer />}
      />
      <Route
        exact
        path="/userDashboard/getAccounts/:username"
        element={<GetAccounts />}
      />
    </Routes>
  );
}

export default App;
