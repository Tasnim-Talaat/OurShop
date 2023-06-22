import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosistance } from '../../Network/axiosistance';
import { Link } from 'react-router-dom'



export default function Login() {
        const[email,setEmail]=useState('')
        const[password,setPassword]=useState('')
        const [isLoading , setIsLoading]=useState(false)
        const [error ,setError]=useState('')

        let navigate =useNavigate()
      

        async function sendLoginToApi(){
        try{
                await axiosistance.post(`/user/login/`,{username:email,password:password})
                .then((response) => {
                        console.log(response)

                        localStorage.setItem('token', response.data.token); 
                        localStorage.setItem('name', response.data.name); 
                        localStorage.setItem('id', response.data.id); 
                        localStorage.setItem('email',email); 
                        localStorage.setItem('isAdmin',response.data.is_superuser)
                        localStorage.setItem('isLogin',true)
                })

                setIsLoading(false)
                navigate('/')
        }
        catch(error){
          console.log(error)
          setError(error.response.data.detail)
              setIsLoading(false)
        }
         }

        function loginSubmit(e){
                e.preventDefault()
                sendLoginToApi()
                setIsLoading(true)
                

             

        }

       
  return <>
   <section className=" py-5 ">
  <div className="container ">
        <form onSubmit={loginSubmit} className='py-5 '>
            <h1 className='mb-3 fs-1 text-center '> Login User </h1>
            <div className="text-danger text-center" id="errors">{error}</div>
            <div className="email">
            <label htmlFor="email">Email</label>
        <input type="text" name='email' id='email' className='form-control mb-3'onChange={(e)=>setEmail(e.target.value)}required/>
            </div>
            <div className="pass">
            <label htmlFor="password">Password:</label>
        <input type="password" name='password' id='password' className='form-control mb-3'  onChange={(e)=>setPassword(e.target.value)} required/>
      
            </div>
       
       <div className="submit d-flex justify-content-center align-items-center ">
       <button className='btn btn-danger rounded  py-2 px-5'>{isLoading === true ? (<i className='fa-solid fa-spinner fa-spin'></i>) : ("login")}</button>

       </div>
        </form>
        <div className="register" id="register">
                                                Don't have an account? <Link  to='/register' className="text-danger"> Sign up</Link>
                                        </div>
        
  </div>
  </section>
  </>
}
