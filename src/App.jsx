import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Single_item from "./Pages/Single_item";
import Allproducts from "./Pages/Allproducts";
import Payment from "./Pages/Payment";
import AddCard from "./Pages/AddCard";
import Admin_home from "./admin/pages/Admin_home";
import Allproducts_admin from "./admin/pages/Allproducts_admin";
import Privacy_Policy from "./Pages/Privacy_Policy";
import Exchange_Policy from "./Pages/Exchange_Policy";
import Terms_of_service from "./Pages/Terms_of_service";
import Shipping_policy from "./Pages/Shipping_policy";
function App() {
  return (
    <div className="max-w-[500px] mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Single_item/:index" element={<Single_item />} />
        <Route path="/payment/:index" element={<Payment />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/allproducts/:type" element={<Allproducts />} />
        <Route path="/addtocard" element={<AddCard />} />
        <Route path="/Admin_home/home" element={<Admin_home />} />
        <Route path="/Admin_home/allproducts_admin" element={<Allproducts_admin />} />
        <Route path="/Privacy_Policy" element={<Privacy_Policy />} />
        <Route path="/Exchange_Policy" element={<Exchange_Policy />} />
        <Route path="/Terms_of_service" element={<Terms_of_service />} />
        <Route path="/Shipping_policy" element={<Shipping_policy />} />
      </Routes>
    </div>
  );
}

export default App;
