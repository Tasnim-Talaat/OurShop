

import Axios  from "axios"
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'



export default function CategoryScreen ()  {
        const[category,setCategory]=useState([])
        async function getCategory(){
                const {data}=await Axios.get(`http://localhost:8000/product/category/`)
                setCategory(data)
        }
        
        useEffect(()=>{
                getCategory();
          },[])
        return (
        <>
<div className="container">
<h2 className="py-3" >Collection </h2>
        <div className='row '>
       {/* { console.log(category)} */}

                {category.map((val, index) => {
                return (
                <div className='col-md-2 ' key={index}>
                        <div className="card">
                <Link to={`/collection/${val.name}`} className='nam' >

                <img src={"http://localhost:8000" + val.image} alt='' width='300px' className="img w-100 "/>
                           </Link>
                                
                <Link to={`/collection/${val.name}`} className='nav-link text-center' >

                <i className="card-title  ">{val.name}</i>
                </Link>
                </div>
                </div>
                )
                })}
        </div>
        </div>
                </>
        )
}

