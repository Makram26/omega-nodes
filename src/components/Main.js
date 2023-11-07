import React from "react";
import "../../src/components/style.css";
// import AlertBox from "./components/AlertBox";
import Footer from "./Footer";
import Home from "./Home";
// import ManageNodes from "./components/ManageNodes";
import Navbar from "./Navbar";
import TestWalletAdapter from "./TestWalletAdapter";
// import NodesDetails from "../components/NodesDetails";
// import NodesForRental from "./components/NodesForRental";


function Main() {
//   const [alert, setAlert] = useState(false);
//   const showAlert = () => {
//     setAlert(true);
//     document.querySelector('.alert_box').classList.add('alert_active')
//   };
//   const closeAl = () => {
//     document.querySelector('.alert_box').classList.remove('alert_active')
//   };
  return (
    <>
      {/* <Navbar /> */}
    
      <Home />
      {/* <NodesDetails /> */}
      {/* <ManageNodes showAlert={showAlert} /> */}
      {/* <NodesForRental /> */}
      {/* <AlertBox alert={alert} closeAl={closeAl}  /> */}
      {/* <Footer /> */}
    </>
  );
}

export default Main;
