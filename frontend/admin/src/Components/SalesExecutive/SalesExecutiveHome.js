import React from "react";
import SalesExecutiveDashBoard from "./SalesExecutiveDashBoard";
import "../Common/homestyle.css";

import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function SEHome() {
  const data = [
    {
      name: 'RayBan',
      sales: 4000,
      product: 2400,
      amt: 2400,
    },
    {
      name: 'PRADA',
      sales: 3000,
      product: 1398,
      amt: 2210,
    },
    {
      name: 'Vogue',
      sales: 2000,
      product: 9800,
      amt: 2290,
    },
    {
      name: 'lafont',
      sales: 2780,
      product: 3908,
      amt: 2000,
    },
    {
      name: 'ELLE',
      sales: 1890,
      product: 4800,
      amt: 2181,
    },
    {
      name: 'bolle',
      sales: 2390,
      product: 3800,
      amt: 2500,
    },
    {
      name: 'FLEXON',
      sales: 3490,
      product: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div>
        <SalesExecutiveDashBoard></SalesExecutiveDashBoard>

       <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Sales</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>30000/=</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Average Leaves Per Month</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>2</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Increase</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>20%</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Alerts</h3>
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

export default SEHome;
