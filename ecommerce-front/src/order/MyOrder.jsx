import Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';

export default function MyOrder() {
        const [order,setOrder]=useState([])
        const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  "Content-type": "multipart/form-data",
            
                },
              };
             
        async function getorder(){
                const {data}=await Axios.get(`http://localhost:8000/order/myorder/`,config)
                console.log(data)
                setOrder(data)
        }
        useEffect(()=>{
                getorder();
                
                }, );
  return <>
  <div className="container py-5">
  <h1 className='border-bottom w-50 py-3 '>MyOrder Page : </h1>
<div className="table-responsive">
  <table className="table table-striped table-hover ">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">User</th>
      <th scope="col">Price</th>
      <th scope="col">Paid</th>
      <th scope="col">Deliverd</th>
      <th scope="col">Status</th>
      
      <th scope="col">Details</th>
     
    </tr>
  </thead>
  <tbody>
        {order.map((o,index)=>(
                <tr key={index}>
      <td>{o.id}</td>
      <td>{o.user[0].name}</td>
      <td>{o.total_price}</td>
      <td>{o.is_paid ? <i className='fa-solid fa-check text-success'></i> :<i className='fa-solid fa-xmark text-danger'></i>}</td>
      <td>{o.is_delivered ? <i className='fa-solid fa-check text-success'></i> :<i className='fa-solid fa-xmark text-danger'></i>}</td>
      <td>{o.is_paid && o.is_delivered?'deliverd':o.is_paid?'shipped':o.status}</td>
      
      <td>      <Link className='btn btn-info' to={`/order/${o.id}`}>view</Link>
</td>
      

    </tr>)
        
        )}
    
  </tbody>
</table>
</div>
  </div>
  </>
}
