import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Login from "./Components/Employee/Login";
import SignUp from "./Components/Employee/SignUp";
import AdminHome from "./Components/Employee/AdminHome";
import AllSalesExecutive from "./Components/Employee/AllSalesExecutives";
import AddSalesExecutive from "./Components/Employee/AddSalesExecutives";
import AddDeliveryDriver from "./Components/Employee/AddDeliveryDriver";
import UpdateSalesExecutive from "./Components/Employee/UpdateSalesExecutive";
import AllDeliveryDriver from "./Components/Employee/AllDeliveryDrivers";
import UpdateDeliveryDriver from "./Components/Employee/UpdateDeliveryDriver";
import SalesExecutiveReport from "./Components/Employee/SalesExecutiveReport";
import DeliveryDriverReport from "./Components/Employee/DeliveryDriverReport";
import SalesExecutiveHome from "./Components/SalesExecutive/SalesExecutiveHome";
import DeliveryDriverHome from "./Components/DeliveryDriver/DeliveryDriverHome";
import ViewProfileDD from "./Components/DeliveryDriver/DeliveryDriverViewProfile";
import ViewProfileSE from "./Components/SalesExecutive/SalesExecutiveViewProfile";
import ApplyForLeaveSE from "./Components/SalesExecutive/ApplyForLeaveSE";
import ApplyForLeaveDD from "./Components/DeliveryDriver/ApplyForLeaveDD";
import ViewLeaveSE from "./Components/SalesExecutive/SalesExecutiveViewLeave";
import ViewLeaveDD from "./Components/DeliveryDriver/DeliveryDriverViewLeave";
import AllLeave from "./Components/Employee/AllLeaves";

import NewOrders from "./pages/NewOrders";
import ViewProduct from "./pages/ProductDisplay";
import AddProduct from "./pages/ProductForm";
import ProductUpdate from "./pages/ProductUpdate";

import PaymentPage from "../src/Components/Payment/Payment";
import CouponPage from "../src/Components/Promotion/Users";
import CreateUser from "../src/Components/Promotion/CreateUser";
import UpdateUser from "../src/Components/Promotion/UpdateUser";
//import Luckyspinner from "../src/Components/Promotion/luckyspinner";
import Details from "../src/Components/Promotion/Details";

import ListSupplier from "./Components/Supplier/ListSupplier";
import AddSupplier from "./Components/Supplier/AddSupplier";
import ViewSupplier from "./Components/Supplier/ViewSupplier";

import AddDelivery from "./Components/delivery/AddDelivery";
import Editstud from "./Components/delivery/Editstud";
import Viewstud from "./Components/delivery/Viewstud";
import AllDelivery from "./Components/delivery/AllDelivery";

// import Header from "./Components/Employee/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Header></Header> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/adhome" element={<AdminHome />} />
          <Route exact path="/addse" element={<AddSalesExecutive />} />
          <Route exact path="/adddd" element={<AddDeliveryDriver />} />
          <Route exact path="/allse" element={<AllSalesExecutive />} />
          <Route
            exact
            path="/updatese/:id"
            element={<UpdateSalesExecutive />}
          />
          <Route exact path="/alldd" element={<AllDeliveryDriver />} />
          <Route
            exact
            path="/updatedd/:id"
            element={<UpdateDeliveryDriver />}
          />
          <Route exact path="/reportse" element={<SalesExecutiveReport />} />
          <Route exact path="/reportdd" element={<DeliveryDriverReport />} />
          <Route exact path="/sehome" element={<SalesExecutiveHome />} />
          <Route exact path="/ddhome" element={<DeliveryDriverHome />} />
          <Route exact path="/viewse" element={<ViewProfileSE />} />
          <Route exact path="/viewdd" element={<ViewProfileDD />} />
          <Route exact path="/applyse" element={<ApplyForLeaveSE />} />
          <Route exact path="/applydd" element={<ApplyForLeaveDD />} />
          <Route exact path="/allleave" element={<AllLeave />} />
          <Route exact path="/leavese" element={<ViewLeaveSE />} />
          <Route exact path="/leavedd" element={<ViewLeaveDD />} />

          <Route exact path="/payment" element={<PaymentPage />} />
          <Route exact path="/coupon" element={<CouponPage />} />
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
          <Route path="/views/:id" element={<Details />}></Route>
          {/*<Route path="coupon/lucky" element={<Luckyspinner />}></Route>
          
          <Route path="/spincrud" element={<Spincrud />}></Route>
          <Route path="/popup" element={<Popup />}></Route>
          {/* <Route path='/popup2' element={<Model2/>}></Route> 
          <Route path="/popup2" element={<Offer />}></Route> */}

          <Route path="/list" element={<ListSupplier />} />

          <Route path="/add" element={<AddSupplier />} />

          <Route path="/edit/:id" element={<AddSupplier />} />

          <Route path="/view/:id" element={<ViewSupplier />} />
          <Route path="/order" element={<NewOrders />} />
          <Route path="/ViewProducts" element={<ViewProduct />} />
          <Route path="/createProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<ProductUpdate />} />

          <Route path="/delivery" element={<AllDelivery />} />

          <Route path="/add-delivery" element={<AddDelivery />} />

          <Route path="/editstud/:id" element={<Editstud />} />

          <Route path="/viewstud/:id" element={<Viewstud />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
