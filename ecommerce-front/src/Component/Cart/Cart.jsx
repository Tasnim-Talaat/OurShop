import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CartCount } from '../../Store/Action/Cart'

export default function Cart() {
        const id=localStorage.getItem("id")
        const [cart,setCart]=useState([])
        let navigate=useNavigate()
        let count=useSelector((state)=>state.counter.count)
        const dispatch =useDispatch()
        let total=0
        const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              };
        async function getCart(){
                const {data}=await Axios.get(`http://localhost:8000/cart/cart/${id}/`,config)
                setCart(data)
                dispatch(CartCount(count=cart.length))


        }
        async function dellcart(id){
                await Axios.delete(`http://localhost:8000/cart/delete/${id}`,config)
                getCart()
                }
        useEffect(()=>{
                getCart();
                        
                

                
        },[cart])
        
  return<>
  <div className="">
        <div className="container">
                <Link className="text-dark" to='/'>Home / </Link> 
                <Link className="text-dark" to='/cart'>Cart /</Link> 
        </div>
</div>
<div className="py-5">
        <div className="container">
                <div className="row">
                        <div className="col-md-12">
                                <div className="card shadow">
                                        <div className="card-body cartdata">
                                        {cart.length>0?<>
                                        
                                                <div className="row  product_data">
                                                       {cart.map((item,index)=>
                                                       <div className='row' key={index}>
                                                        <div className="col-md-2 my-auto" >
                                                        {/* <img className='w-100' src={"http://localhost:8000" + products.image} className="w-100" alt="image"/> */}
                                                                <img src={"http://localhost:8000" + item.product[0].image} className='w-75 h-100 img rounded py-3' alt="image here"/>
                                                        </div>
                                                        <div className="col-md-3 my-auto">
                                                                <h6> 
                                                                        {item.product[0].name}
                                                                </h6>
                                                        </div>
                                                        <div className="col-md-2 my-auto">
                                                                <h6>
                                                                        {item.product[0].price}
                                                                        </h6>
                                                        </div>
                                                        <div className="col-md-3 my-auto">
                                                                        
                                                                        
                                                        <div className="input-group text-center" >
                                                                {/* <button className="input-group-text changQuantity decrement-btn " onClick={()=>item.product_qty-1 }>-</button> */}
                                                                <input type="text" name="quantity" className="form-control  text-center qty-input" value={item.product_qty} onChange={(e)=>item.product_qty=e.target.value}/>
                                                        {/* <button className="input-group-text changQuantity increment-btn" value={item.product_qty} onClick={()=>item.product_qty + 1}>+</button> */}
                                                        </div> 

                 </div>
                                                        <div className="col-md-2 my-auto">
                                                        <button className="btn btn-danger delete-cart-item" onClick={()=>dellcart(item.id)}><i className="fa fa-trash"></i>Remove</button>
                                                        </div>

                                                        <Link to="/total" className="btn btn-outline-success my-3 d-none"  >Total: {total+=item.product_qty* item.product[0].price} 
                                                        {/* {sessionStorage.setItem(`item`,[item.id,item.product_qty,item.product[0].price,item.product[0].image])} */}
                                                        </Link>
                                                       </div>
                                                       )}
                                                </div>
                                                       <div  className=" my-3"  >Total: {total} </div>
                                                <Link  className="btn btn-outline-success my-3" onClick={()=>( localStorage.setItem('cart',JSON.stringify(cart)),localStorage.setItem('cartID',JSON.stringify(cart.map((c)=>c.id))),localStorage.setItem('totalcart',total),
                                                        navigate('/shipping'))
                                                       
                                                
                                                      
                                        }>checkout </Link>
                                               </>:
                                                <h4>Your Cart Is Empty</h4>}  
                                                
                                               
                                         </div>
                                </div>
                        </div>
                </div>
        </div>
</div>
  </>
}
