import React from "react"
import "./style.css"
import TopCart from "./TopCart"

const TopCate = () => {
  return (
    <>
      <section className='TopCate background pt-3 '>
        <div className='container'>
         
          
              <h2>Top Products</h2>
            <div className=' row  '>
            
           
          <TopCart />
          </div>
        </div>
      </section>
    </>
  )
}

export default TopCate
