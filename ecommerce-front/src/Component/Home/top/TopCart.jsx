import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Axios  from 'axios'

export default function TopCart ()  {
  const[products,setProduct]=useState([])
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  }
        async function getTopProducts(){
            try{
            const {data}=await Axios.get(`http://localhost:8000/product/top/`)
            // console.log(data)
            setProduct(data)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getTopProducts();
    
},[])
  return (
    <>
     <Slider {...settings}>
        {products.map((pro, index) => 
        
                <div className='col-md-3' key={index}>
                  <div className='card my-5' >
                <div className='nametop d_flex'>
                  <span className=' bg-dark'>{pro.name}</span>

                  <span className='tright bg-dark'>{pro.rating.rate} {console.log(pro.rating.rate)}</span>
                </div>
                <Link to={`/productlist/${pro.id}`}>

                <div className='w-100'>
                  <img className='w-100 card-img' src={"http://localhost:8000" + pro.image} alt=''  />
                  {/* <img src={pro.image} alt=''  className='card-img' /> */}
                </div>
                </Link>
              </div>
            </div>
            )
          }
      </Slider>
    </>
  )
}


