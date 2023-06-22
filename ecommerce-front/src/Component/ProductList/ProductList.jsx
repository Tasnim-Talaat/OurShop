import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import axios from 'axios'

export default function ProductList() {
        const [product,setProduct]=useState([])
        const [category,setCategory]=useState([])


        
       async function getCategory(){
                const {data}=await Axios.get(`http://localhost:8000/product/category/`)
                setCategory(data)
        }
       async function getProduct(){
                const {data}=await Axios.get(`http://localhost:8000/product/all/`)
                // console.log(data)
                setProduct(data)
        }
       
       
       
       const hanndleChangeFillter=(e)=>{
            e.target.value === 'all'&& getProduct()
            let datas=product.filter((pro)=>pro.price >= e.target.value)

            setProduct(datas)
            // console.log(e.target.value)
       }
       const hanndleChangeFillters=(e)=>{
            e.target.value === 'all'&& getProduct()
            let datass=product.filter((prod)=>prod.rating.rate >= e.target.value)

            setProduct(datass)
            // console.log(e.target.value)
       }
        useEffect(()=>{
            getCategory()
              getProduct();
            //   getCategory()
        },[])

       

  return <>
  <h1 className='text-center pb-5'>Our Products</h1>

    <div className="container">
    <div className="row  ">
      
        
      <div className="col-md-2">
      
      
      <h6>Filter Rate</h6>
      <select name="" id="" onChange={hanndleChangeFillters} className="form-select py-3" multiple aria-label="multiple select example">
      <option hidden>select Rate</option>
      <option value="all">All</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
</select>
<h6 className='pt-3'>Filter price</h6>
<select name="" id="" onChange={hanndleChangeFillter} className="form-select " multiple aria-label="multiple select example">
      <option hidden>select price</option>
      <option value="all">All</option>
      <option value="55">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
      <option value="300">300</option>
</select>
      </div>
      <div className="col-md-10">
            <div className="container">
            <div className="row">
            {product.map((prod,index)=>
                         

                         <Product 
                         products={prod}
                         key={index}
                         />
                         )}
                         
                         </div>
      </div>
            </div>
      
          
        
  </div>
  </div>
  </>
}
