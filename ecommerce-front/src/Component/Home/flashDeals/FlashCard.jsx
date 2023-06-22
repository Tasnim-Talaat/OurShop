import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import  Axios  from 'axios'

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn d-flex justify-content-end align-items-end' onClick={onClick}>
      <button className='next '>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn d-flex justify-content-start align-items-start' onClick={onClick}>
      <button className='prev '>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}
const FlashCard = ({ productItems }) => {
  const [products,setProducts]=useState([])

async function getProduct(){
    const {data}=await Axios.get(`http://localhost:8000/product/all/`)
    // console.log(data)
    setProducts(data)
}
useEffect(()=>{
  getProduct();
},[])



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <>
      <Slider {...settings}>
        {products.map((product,index) => {
          return (
            <div className='' key={index}>
              <div className='text-center'>
              <Link to={`/productlist/${product.id}`}>

                <div className='fluid-img'>
                  <img src={"http://localhost:8000" + product.image} alt='' className='w-75' width='150px' />
                </div>
                </Link>
                <div className='text-center'>
                  <h5>{product.name}</h5>
                  <div className='price'>
                    <h6>${product.price} </h6>
                  
                  </div>

                </div>
              </div>
            </div>
          )
        })}

      </Slider>
    </>
  )
}

export default FlashCard
