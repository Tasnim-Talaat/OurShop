import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Product from '../Product/Product'

export default function CollectionDetail() {
        const params=useParams()
        console.log(params.name)
        const [category,setCategory]=useState([])
    
        async function getCategoryList(){
                try{
                const {data}=await Axios.get(`http://localhost:8000/product/category/${params.name}/`)
                setCategory(data)
                console.log(category)}
                catch(error){
                        console.log(error)

                }
        }
        useEffect(()=>{
                getCategoryList()
          },[params.name])
  return <>
  <section className='py-5'>
  <h1 className='text-center pb-5'> {params.name}</h1>
  <div className="container">
                  <div className="row">
                {category.map((cat,index)=>
                 <Product 
                               products={cat}
                               key={index}
                               />
                )}
               
        </div>

</div>
</section>
  
  </>
}
