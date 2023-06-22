import React, { useEffect, useState } from 'react'
import  Axios  from 'axios'
import { useNavigate,useParams} from 'react-router-dom'

export default function EditUser() {

        const params=useParams()
        const [user,setUser]=useState('')
        const [myUser,setMyUser]=useState('')
        const [username,setusername]=useState('')
        const [fname,setfname]=useState('')
        const [email,setEmial]=useState('')
        const [isAdmin,setIsAdmin]=useState(false)
        const [password,setPassword]=useState(0)
        
        let navigate=useNavigate()
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        async function getUser(){
          const {data}=await Axios.get(`http://localhost:8000/user/userId/${params.id}/`,config)
          // console.log('dddd',data)
          setMyUser(data[0])
  }

              async function editUser(){
                try{
             const {data}=await Axios.put(`http://localhost:8000/user/updateuser/${params.id}/`,{username:email,email:username,first_name:fname,password:password,isAdmin:isAdmin,is_superuser:isAdmin},config)
             setUser(data)
              // console.log(data)
              // console.log(isAdmin)
                      // getUser()
                }
                catch(error){
                  console.log(error.response.data)
        
        
            }
              }
              useEffect(() => {
                getUser()
              }, []);
            
        const formSubmit=(e)=>{
          e.preventDefault()
          editUser()
          getUser()
                navigate('/listuser')
              }
  return <>
  <div className="container py-5">
    <h1 className='border-bottom w-50 py-3'>Edit User</h1>
    <div className="form">
        {/* {console.log(myproduct[0])} */}
      <form onSubmit={formSubmit} className="">
      <div className="fname">
            <label htmlFor="fname">First Name</label>
        <input type="text" name='fname' id='fname' placeholder={myUser.name} className='form-control mb-3'onChange={(e)=>setfname(e.target.value)} required/>
            </div>
      <div className="username">
            <label htmlFor="username">Username</label>
        <input type="text" name='username' id='username' placeholder={myUser.name} className='form-control mb-3'onChange={(e)=>setusername(e.target.value)} required/>
            </div>
            <div className="email">
            <label htmlFor="email">Email</label>
        <input type="email" name='email' id='email' placeholder={myUser.email} className='form-control mb-3'onChange={(e)=>setEmial(e.target.value)} required/>
            </div>
            <div className="pass">
            <label htmlFor="password">Password:</label>
        <input type="password" name='password' id='password' placeholder='********' className='form-control mb-3'  onChange={(e)=>setPassword(e.target.value)} required/>
        <input type="radio" name='isAdmin' id='isAdmin' value='1' className='me-1'  onChange={(e)=>setIsAdmin(e.target.value)}  />
            <label htmlFor="isAdmin">IsAdmin</label>
        <input type="radio" name='isAdmin' id='isAdmin' value='0' className='ms-5 me-1'  onChange={(e)=>setIsAdmin(e.target.value)}  />
            <label htmlFor="isAdmin">user</label>
            </div>
            {console.log(isAdmin)}
      <button className='btn btn-primary my-5'>Edit Product</button>
      </form>
    </div>
  </div>
  </>
}
