import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import Swal from 'sweetalert2'
export default function ListUser() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
        const[users,setUsers]=useState([])
        async function getUsers(){
            try{
            const {data}=await Axios.get(`http://localhost:8000/user/alluser/`,config)
            // console.log(data)
            setUsers(data)
    }
    catch(error){
      console.log(error)
    }
  }
       
        // const delProduct=(indexProduct)=>{
                // Swal.fire({
                //         title:`Are You sure to delete this product`,
                //         showCancelButton:true}
                //       ).then((dat)=>{
                //       dat.isConfirmed && dellProduct(indexProduct)
                // }
                           
                //       )
        async function dellUser(id){
        await Axios.delete(`http://localhost:8000/user/delete/${id}`,config)
        getUsers()
        }


        // }
        useEffect((id)=>{
                  getUsers();
            },[])
  return <>
   <div className="container py-5">
  <h1 className='border-bottom w-50 py-3'>User Page : </h1>
  <Link className='btn btn-success mx-2' to='/adduser'>Add User</Link>

  <table className="table table-striped mt-4">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">IsAdmin</th>
      <th scope="col">Details</th>
    </tr>
  </thead>
  <tbody>
        {users.map((user,index)=>
                <tr key={index}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.is_superuser? <i className='fa-solid fa-check text-success'></i> :<i className='fa-solid fa-xmark text-danger'></i>}</td>
      <td className=''>
        <button className='btn btn-danger' onClick={()=>dellUser(user.id)}>Delete</button>
       <Link className='btn btn-warning mx-2 my-2'to={`/userlist/edit/${user.id}`}>Edit</Link></td>
    </tr>
        
        )}
    
  </tbody>
</table>
  </div>
  </>
}
