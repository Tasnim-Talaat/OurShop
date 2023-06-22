import React from 'react'
import OwerService from './OwerService/OwerService'
import TopCart from './top/TopCart'
import TopCate from './top/TopCate'
import CategoryScreen from './CategorySceen/CategoryScreen'
import Shop from './Shop/Shop'
import FlashDeals from './flashDeals/FlashDeals'
import Categories from './Categories/Categories'
import Sliderheader from './Sliderheader/Sliderheader'

export default function Home() {
  return <>
<div className="container ">
  <div className="row">
    <div className="col-md-2">
      <Categories/>
      </div>
      <div className="col-md-10 py-5">
        <Sliderheader/>
      </div>
  </div>
                       <FlashDeals/>
                        {/* {!keyword && <SlideCard />} */}
                        <Shop/>

                        
                        <CategoryScreen/>

                        <TopCate />
   <h2 className='text-center '>Our Service</h2>
                        <OwerService />
                        </div>
  </>
}
