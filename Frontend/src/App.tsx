import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login'
import Productmanagement from './components/pages/Productmanagement'
import Customerlogin from './components/pages/Customerlogin'
import Customersignup from './components/pages/Customersignup'
import CustomerLandingpage from './components/pages/CustomerLandingpage'
import CustomerCart from './components/pages/CustomerCart'
import CustomerManagement from "./components/pages/CustomerManagement"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/landingpage' element={<Productmanagement />} />
      <Route path="/customerlogin" element={<Customerlogin />} />
      <Route path="/customersignup" element={<Customersignup />} />
      <Route path="/customerlandingpage" element={<CustomerLandingpage />} />
      <Route path="/customercart" element={<CustomerCart />} />
      <Route path='/customermanagement' element={<CustomerManagement />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
