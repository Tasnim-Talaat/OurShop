import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Sliderheader() {
        const[products,setProducts]=useState([])
        const [randomProduct, setRandomProduct] = useState(null);
        const settings = {
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
              }
        async function getProduct(){
                const {data}=await Axios.get(`http://localhost:8000/product/top/`)
                setProducts(data)
        }
        const getRandomProduct = () => {
                const randomIndex = Math.floor(Math.random() * products.length);
                const randomProduct = products[randomIndex];
                setRandomProduct(randomProduct);
              };
              
              
        useEffect(()=>{
                getProduct();
                getRandomProduct();
          },[])
        
  return <>
 
  <div className="container bg-dark h-100 w-100 rounded">
 
        <Slider {...settings}>
        {products.map((pro, index) => 
        
                <div className=' ' key={index}>
                  <div className=' w-100 my-5' >
                
                <Link to={`/productlist/${pro.id}`}>

                <div className='d-flex justify-content-center align-items-center   '>
                  <img className='w-50 card-img rounded-circle' src={"http://localhost:8000" + pro.image} alt=''  />
                </div>
                </Link>
              </div>
            </div>
            )
          }
      </Slider>
        </div>
        
        
  </>
}
