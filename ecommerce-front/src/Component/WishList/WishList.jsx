import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { WishlistCount } from '../../Store/Action/wishlist'

export default function WishList() {
        const id=localStorage.getItem("id")
        const [wishList,setWishlist]=useState([])
        let countw=useSelector((state)=>state.counterw.countw)
        const dispatch =useDispatch()
        const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              };
        async function getWishlist(){
                const {data}=await Axios.get(`http://localhost:8000/wishlist/wishlist/${id}/`,config)
                // console.log('ddddd',data)

                setWishlist(data)
                dispatch(WishlistCount(countw=wishList.length))

        }
        async function dellwhishlist(id){
                await Axios.delete(`http://localhost:8000/wishlist/delete/${id}`,config)
                getWishlist()
                }
        useEffect(()=>{
                getWishlist();
                
        },[wishList])
        

  return<>
    <div className="">
        <div className="container">
                <Link className="text-dark" to='/'>Home / </Link> 
                <Link className="text-dark" to='/wishlist'>Wishlist /</Link> 
        </div>
</div>
<div className="py-5">
        <div className="container">
                <div className="row">
                        <div className="col-md-12">
                                <div className="card shadow">
                                        <div className="card-body cartdata">
                                             {wishList.length>0?<>
                                                <div className="row  product_data">
                                                       {wishList.map((item,index)=>
                                                       <div className='row' key={index}>
                                                        <div className="col-md-2 my-auto" >
                                                        {/* <img className='w-100' src={"http://localhost:8000" + products.image} className="w-100" alt="image"/> */}
                                                                <img src={"http://localhost:8000" + item.product[0].image} className='w-75 h-100 img rounded py-3' alt="image here"/>
                                                        </div>
                                                        <div className="col-md-4 my-auto">
                                                                <h6> 
                                                                        {item.product[0].name}
                                                                </h6>
                                                        </div>
                                                        <div className="col-md-3 my-auto">
                                                                <h6>
                                                                        {item.product[0].price}
                                                                        </h6>
                                                        </div>
                                                        
                                                        <div className="col-md-3 my-auto">
                                                        <button className="btn btn-danger delete-cart-item" onClick={()=>dellwhishlist(item.id)}><i className="fa fa-trash"></i>Remove</button>
                                                        </div>

                                                       </div>
                                                       )}
                                                </div>
                                                
                                               </>: <h4> WishList Empty</h4>}   
                                                
                                               
                                         </div>
                                </div>
                        </div>
                </div>
        </div>
</div>
  </>
}
