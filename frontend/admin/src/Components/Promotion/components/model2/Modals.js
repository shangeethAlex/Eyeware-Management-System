import React, { useState } from 'react';
import './Model2.css'
import logoImage from './logo.jpg';
import { motion } from "framer-motion";

const Models = () => {

    const [copied, setCopied] = useState(false);
    const cpnCodeRef = React.createRef();

    const handleCopyClick = () => {
    const cpnCode = cpnCodeRef.current.textContent;

    navigator.clipboard.writeText(cpnCode).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <>
    <motion.div initial={{ opacity: 0,y:-100,scale:1 }} animate={{ opacity: 1,y:50,scale:1.1 }} transition={{stiffness: 400  }}>
        <div class="coupon-card">
          <div><img src={logoImage} class="logo"/></div>
            
            <h3>20% flat off on all spects</h3>
            <div class="coupon-row">
            <div id="cpnCode" ref={cpnCodeRef}>#C00976534</div>
                <button id="cpnBtn" onClick={handleCopyClick}>{copied ? 'COPIED' : 'COPY CODE'}</button>
            </div>
            <p>valid till 20 dec 2021</p>
            
        </div>
    </motion.div>
    </>  
  )
}

export default Models
