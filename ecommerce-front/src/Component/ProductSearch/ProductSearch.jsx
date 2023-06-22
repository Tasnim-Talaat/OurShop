import React from 'react'
import { useSelector } from "react-redux";
import ProductSearching from '../ProductSearching/ProductSearching';


export default function ProductSearch() {
        const productList = useSelector((state) => state.getProductList.productList);
        // console.log(productList)
        
  return <>
    <h1 className='text-center '>Search Products</h1>

  <div className="conatiner pb-5">
        <div className="row g-3 p-3">
  { productList.length>0 ?
                  productList.map((prod,index)=>
                               

                  <ProductSearching
                  products={prod}
                  key={index}
                  />
                  )
                  :<h4 className='text-center py-5 my-5 text-danger'>No Products Contain This Name...</h4>
                }
                </div>
                </div>
  </>
}
