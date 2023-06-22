import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { axiosistance } from '../../Network/axiosistance';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const counter=useSelector((state)=>state.counter.count)
  const counterw=useSelector((state)=>state.counterw.countw)
  const isLogin=localStorage.getItem('isLogin')
  const isAdmin=localStorage.getItem('isAdmin')
  // console.log(counter)
  let navigate =useNavigate()

  const LogOut=()=>{
    localStorage.clear();
    navigate('/')
  }
    
  return <>
  <div className="container">
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container">
    <Link className="navbar-brand ps-3" to="#">Shop</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pl">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="collection">collections</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="contact">ContactUs</Link>
        </li>
        
        
          </ul>
          <Search />
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/wishlist"> <i className='fa-regular  fa-heart position-relative'>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-success">
    {counterw}
    <span class="visually-hidden">unread messages</span>
  </span>
            </i> </Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/cart">
           <i className='fa-solid fa-cart-plus position-relative'>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-danger">
    {counter}
    <span class="visually-hidden">unread messages</span>
  </span>
  </i> </Link>
        </li>
        {isAdmin === 'true'&&
          <div className="dropdown ">
          <Link className="btn  dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Admin
          </Link>
         
           <ul className="dropdown-menu">
             <li><Link className="dropdown-item" to="listuser">users</Link></li>
             <li><Link className="dropdown-item" to="catlist">Category</Link></li>
             <li><Link className="dropdown-item" to="listproduct">products</Link></li>
             <li><Link className="dropdown-item" to="listorder">Orders</Link></li>
           </ul>
         </div>
        }
        {isLogin?
        <div className="dropdown px-3">
 <Link className="btn  dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
 {localStorage.getItem("name")} 
 </Link>

  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to="myorder">My Order</Link></li>
    <li><Link className="dropdown-item" to="/" onClick={LogOut}>Logout</Link></li>
  </ul>
</div>

       
      
      
        
      :
      
        <li className="nav-item ">
          <Link className="nav-link" to="login"> <i className='fa-regular fa-circle-user mx-2 fs-6 rounded'></i>Log In</Link>
        </li>
       
      }
        {/* <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/login"> <i className='fa-regular fa-circle-user'></i> Login</Link>
        </li> */}
       
        </ul>
    </div>
  </div>
</nav>
</div>
  </>
}
