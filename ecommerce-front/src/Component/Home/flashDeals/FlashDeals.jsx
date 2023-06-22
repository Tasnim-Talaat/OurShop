import React from "react"
import FlashCard from "./FlashCard"
import "./style.css"

const FlashDeals = ({ productItems, addToCart }) => {
  return (
    <>
      <section className='py-5'>
        <div className='container'>
          <div className=''>
            <h3>Latest Product</h3>
          </div>
          <FlashCard  />
        </div>
      </section>
    </>
  )
}

export default FlashDeals
