import React, { useState,useEffect } from "react";
import "../App.css";
import Modal from "./Modal";

function Popup() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 5000); // 30 seconds in milliseconds

    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(timer);
    };
  }, []);


  return (
    <div className="App">
      {/* <button className="openModalBtn" onClick={() => {setModalOpen(true);}}>Open</button> */}
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  );
}

export default Popup;
