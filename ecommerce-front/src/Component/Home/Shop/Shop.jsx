import React from 'react'
import { Link } from 'react-router-dom'
import './Shop.css'

export default function Shop() {
  return <>
  <div>
      <div className="container">
          
      <h2 className='py-3' >Shop </h2>

            <div className=" shop p-5 "  style={{height: "220px"}}>
            <Link to="/pl" className="nav-link">
              <div className="d-flex justify-content-center  p-5" >
              <button className="btn btn-dark  " >Shop Now</button>
              </div>
              </Link>
              </div>
           
         
      </div>
    </div>
  </>
}
