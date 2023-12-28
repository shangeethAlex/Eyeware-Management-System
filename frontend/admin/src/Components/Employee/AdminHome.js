import React from "react";
import AdminDashBoard from "./AdminDashBoard";
import "../Common/homestyle.css";


import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function AdHome() {
  const data = [
    {
      name: 'RayBan',
      sales: 40000,
      product: 2400,
      amt: 2400,
    },
    {
      name: 'PRADA',
      sales: 30000,
      product: 1398,
      amt: 2210,
    },
    {
      name: 'Vogue',
      sales: 20000,
      product: 9800,
      amt: 2290,
    },
    {
      name: 'lafont',
      sales: 27800,
      product: 3908,
      amt: 2000,
    },
    {
      name: 'ELLE',
      sales: 18900,
      product: 4800,
      amt: 2181,
    },
    {
      name: 'bolle',
      sales: 23900,
      product: 3800,
      amt: 2500,
    },
    {
      name: 'FLEXON',
      sales: 34900,
      product: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div>
        <AdminDashBoard></AdminDashBoard>

        <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Employees</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>
        

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={800}
            height={600}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="product" fill="#8884d8" />
                <Bar dataKey="sales" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={800}
                height={600}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="product" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
   
      </div>
      
    </>
  );
}

export default AdHome;
