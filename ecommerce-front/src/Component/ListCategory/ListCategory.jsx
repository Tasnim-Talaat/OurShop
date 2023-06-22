import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import Swal from 'sweetalert2'
export default function ListCategory() {
        const[category,setCategory]=useState([])
        async function getCategory(){
                const {data}=await Axios.get(`http://localhost:8000/product/category/`)
                console.log(data)
                setCategory(data)
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
        async function dellCategory(id){
        await Axios.delete(`http://localhost:8000/product/dellcat/${id}`,config)
        getCategory()
        }


        // }
        useEffect(()=>{
                  getCategory();
                  // dellProduct();
            },[])

  return <>
  <div className="container py-5">
  <h1 className='border-bottom w-50 py-3'>Category Page : </h1>
  <Link className='btn btn-success mx-2' to='/addcat'>Add Category</Link>

  <table className="table table-striped mt-4">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      {/* <th scope="col">User</th> */}
      <th scope="col">Details</th>
      
    </tr>
  </thead>
  <tbody>
        {category.map((category,index)=>
                <tr key={index}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td className='w-25'><img className='w-25 h-25' src={"http://localhost:8000" + category.image} /></td>
      {/* <td>{category.user[0].username}</td> */}
      <td className=''>
        <button className='btn btn-danger'  onClick={()=>dellCategory(category.id)}>Delete</button>
        <Link className='btn btn-warning mx-2 my-2'to={`/editcat/${category.id}`}>Edit</Link>
        <Link className='btn btn-info ms-3' to={`/collection/${category.name}`}>view</Link>
      </td>
    </tr>
        
        )}
    
  </tbody>
</table>
  </div>
  </>
}
