import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import './form.css';


const Details = () => {
    const {id} = useParams()
    const [users,setUsers] = useState([])
    
    
    useEffect(()=>{
        axios.get('http://localhost:8070/promotion/getUser/'+id)
        .then(res=> setUsers({
            ...users,
            code:res.data.code,
            name:res.data.name,
            value:res.data.value,
            description:res.data.description,
            status:res.data.status,
            couponType:res.data.couponType,
            minOrder:res.data.minOrder,
            maxOrder:res.data.maxOrder,
            restrictEmail:res.data.restrictEmail,
            noItem:res.data.noItem,
            usageLimit:res.data.usageLimit,
            couponQuantity:res.data.couponQuantity,
            startDate:res.data.startDate,
            endDate:res.data.endDate,
            userLimit:res.data.userLimit,


        }))
        .catch(err => console.log(err))
    },[])







  return (
    <div className='overlay'>
      <div className='modalContainer'>
            <Card >
                <CardContent>
                    <div className="add_btn">
                    {/* <button className="btn btn-danger" id="btn1">print</button> */}
                    </div>
                    <div className="row">
                        
                      
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <h4 className="mt-3">Coupon Code: <span >{users.code}</span></h4>
                            <h4 className="mt-3">Coupon Name: <span>{users.name}</span></h4>
                            <h4 className="mt-3">Coupon Value: <span>{users.value}</span></h4>
                                    
                            <h4 className="mt-3">Description: <span>{users.description}</span></h4>
                            <h4 className="mt-3">Status: <span>{users.status}</span></h4>
                            <h4 className="mt-3">couponType: <span>{users.couponType}</span></h4>
                            <h4 className="mt-3">minOrder: <span>{users.minOrder}</span></h4>
                        </div>
                         <div className="right_view  col-lg-6 col-md-6 col-12">
                        <h4 className="mt-3">maxOrder: <span>{users.maxOrder}</span></h4>
                            <h4 className="mt-3">restrictEmail: <span>{users.restrictEmail}</span></h4>
                            <h4 className="mt-3">noItem: <span>{users.noItem}</span></h4>
                            <h4 className="mt-3">usageLimit: <span>{users.usageLimit}</span></h4>
                            <h4 className="mt-3">couponQuantity: <span>{users.couponQuantity}</span></h4>
                            <h4 className="mt-3">startDate: <span>{new Date(users.startDate).toLocaleDateString()}</span></h4>
                            <h4 className="mt-3">endDate: <span>{new Date(users.endDate).toLocaleDateString()}</span></h4>
                            <h4 className="mt-3">userLimit: <span>{users.userLimit}</span></h4>
                        </div> 
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>

  )
}

export default Details
