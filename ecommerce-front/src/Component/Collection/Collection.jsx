import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Collection.css'

export default function Collection() {
        const [category,setCategory]=useState([])
        async function getCategory(){
                const {data}=await Axios.get(`http://localhost:8000/product/category/`)
                console.log(data)
                setCategory(data)
        }
        // async function getCategoryList(catName){
        //         const {data}=await Axios.get(`http://localhost:8000/product/category/${catName}`)
        //         // setCategory(data)
        // }
        useEffect(()=>{
                getCategory();
              
          },[])
  return <>
  <section className=''>
<div className="container">
        <h1 className='text-center'>Our Collection</h1>
        <div className="row  g-3">
                {category.map((cat,index)=>
                 <div className="col-md-4 rounded   image-collection">
                         <Link to={cat.name}>
                      <div className="collection image-img">
             <img className='w-100 rounded '  src={"http://localhost:8000" + cat.image} />
             <span className='rounded collection text'><h3>{cat.name}</h3></span>
            </div>
            </Link>
            </div>
                )}
               
        </div>

</div>
</section>
  
  </>
}
