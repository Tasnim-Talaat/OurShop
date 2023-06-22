import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import Swal from 'sweetalert2'

export default function ListProduct() {
        const[product,setProduct]=useState([])
        async function getProduct(){
                const {data}=await Axios.get(`http://localhost:8000/product/all/`)
                console.log(data)
                setProduct(data)
        }
        
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        // const delProduct=(indexProduct)=>{
                // Swal.fire({
                //         title:`Are You sure to delete this product`,
                //         showCancelButton:true}
                //       ).then((dat)=>{
                //       dat.isConfirmed && dellProduct(indexProduct)
                // }
                           
                //       )
        async function dellProduct(id){
        await Axios.delete(`http://localhost:8000/product/delete/${id}`,config)
        getProduct()
        }


        // }
        useEffect(()=>{
                  getProduct();
                  // dellProduct();
            },[])

  return<>
  <div className="container py-5">
  <h1 className='border-bottom w-50 py-3'>Product Page : </h1>
  <Link className='btn btn-success mx-2' to='/add'>Add Product</Link>

  <table className="table table-striped mt-4">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      {/* <th scope="col">Category</th> */}
      <th scope="col">COUNT</th>
      <th scope="col">Image</th>
      <th scope="col">User</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
        {product.map((product,index)=>
                <tr key={index}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      {/* <td>{product.category}</td> */}
      <td>{product.count_in_stock}</td>
      <td className='w-25'><img className='w-25 h-25' src={"http://localhost:8000" + product.image} /></td>
      <td>{product.user[0]? product.user[0].username:'Admin'}</td>
      <td className=''>
        <button className='btn btn-danger' onClick={()=>dellProduct(product.id)}>Delete</button>
       
      </td>
      <td> <Link className='btn btn-warning 'to={`/productlist/edit/${product.id}`}>Edit</Link></td>
      <td>      <Link className='btn btn-info' to={`/productlist/${product.id}`}>view</Link>
</td>

    </tr>
        
        )}
    
  </tbody>
</table>
  </div>
  
  </>
}
