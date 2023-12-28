import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Modal.css";
import "../Details.jsx";
import { motion } from "framer-motion";

function Modal({ setOpenModal }) {
  return (
    <>
      <motion.div initial={{ opacity: 0,y:-100,scale:1 }} animate={{ opacity: 1,y:50,scale:1.1 }} transition={{stiffness: 400  }}>
      <div className='overlay'>
      <div onClick={(e) => {e.stopPropagation();}}className='modalContainer'>
          <div className="modalRight">
            <div className="content">
              <p>Do you want a</p>
              <h1>$20 CREDIT</h1>
              <p>for your first tade?</p>
            </div>
            <div className="btnContainer">
              <button className="btnPrimary"><span className="bold">YES</span>, I love NFT's</button>
              <button onClick={() => {setOpenModal(false);}}id="cancelBtn">
                <span className="bold">NO</span>, thanks
              </button>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
}

export default Modal;
