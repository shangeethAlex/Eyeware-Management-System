import React, { useState, useEffect } from 'react';
import Modals from './Modals'; // Import your Modal2 component

function Offer() {
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
      {modalOpen && <Modals setOpenModal={setModalOpen} />}
    </div>
  );
}

export default Offer;
