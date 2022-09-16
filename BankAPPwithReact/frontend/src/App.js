// import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/login';
import BankerDashboard from './components/bankerDashboard/dashboard';
import CustomerDashboard from './components/customerDashboard/customerDashboeard'
import CreateBank from './components/bank/createBank';
import AllBank from './components/bank/allBank';
import CreateCustomer from './components/customer/createCustomer';
import AllCustomer from './components/customer/allCustomer';
import UpdateCustomer from './components/customer/updateCustomer'; 
import AllBank1 from './components/bank/allBank1';
import CreateAccount from './components/account/createAccount';
import Deposit from './components/account/deposit';
import WithDraw from './components/account/withDraw';
import AllAccount from './components/account/allAccount';
import AllAccount1 from './components/account/allAccount1';
import Transfer from './components/account/transfer';
import SelfTransfer from './components/account/selftransfer';

function App() {
  return (

  <Routes>
    <Route exact path='/bankerDashboard/:userName' element={<BankerDashboard/>} />
    <Route exact path='/CreateBank/:userName' element={<CreateBank />} />
    <Route exact path='/AllBank/:userName' element={<AllBank />} />
    <Route exact path='/CreateCustomer/:userName' element={<CreateCustomer />} />
    <Route exact path='/AllCustomer/:userName' element={<AllCustomer />} />
    <Route exact path='/AllCustomer/updateCustomer/:user/:userName' element={<UpdateCustomer />} />
    <Route exact path='/AllCustomer/allAccount1/:user/:userName' element={<AllAccount1 />} />
    <Route exact path='/customerDashboard/:userName' element={<CustomerDashboard />} />
    <Route exact path='/AllBank1/:userName' element={<AllBank1 />} />
    <Route exact path='/AllBank1/createaccount/:userName/:bank' element={<CreateAccount />} />
    <Route exact path='/AllAccount/deposit/:userName/:bank' element={<Deposit />} />
    <Route exact path='/AllAccount/withDraw/:userName/:bank' element={<WithDraw/>} />
    <Route exact path='/AllAccount/transfer/:userName/:bank' element={<Transfer/>} />
    <Route exact path='/AllAccount/selfTransfer/:userName/:bank' element={<SelfTransfer/>} />
    <Route exact path='/AllAccount/:userName' element={<AllAccount/>} />
    <Route exact path='/' element={<Login />} />
  </Routes>
  
  )
}

export default App;
