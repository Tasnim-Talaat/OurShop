

import Axios  from "axios";
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function Categories() {
  const[category,setCategory]=useState([])
        async function getCategory(){
                const {data}=await Axios.get(`http://localhost:8000/product/category/`)
                // console.log(data)
                setCategory(data)
        }
        
        useEffect(()=>{
                getCategory();
          },[])
  return <>
  <div className="container py-5">
  <Link to='/pl' className="d-flex p-2 text-decoration-none">
   
   <span className="ms-3">
     <h6 className="text-dark">All</h6>
   </span>
 </Link>
   {category.map((val, index) => {
     return (
     <Link to={`/collection/${val.name}`} className="d-flex p-2 text-decoration-none" key={index}>
     {console.log(val.name)}
   <span className="ms-3">
     <h6 className="text-dark">{val.name }</h6>
   </span>
 </Link>
 )})}
  </div>
  
  </>
}
