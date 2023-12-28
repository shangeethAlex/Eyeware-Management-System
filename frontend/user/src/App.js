import "./App.css";
import "./paymentComponent/Payment.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormSwitcher from "./paymentComponent/FormSwitcher";
import Display from "./pages/Display";
import Header from "./header&Footer/Header";
import Footer from "./header&Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Display />} />
            <Route exact path="/checkout/:value" element={<FormSwitcher />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
