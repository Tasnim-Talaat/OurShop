import React, { useEffect, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { Link,  useNavigate } from 'react-router-dom'
import { axiosistance } from '../Network/axiosistance'
import Order from './Order'
import emailjs from 'emailjs-com';

const sendEmail = (userIdd, templateId, templateParams) => {
  emailjs.send('service_enur74q', templateId, templateParams, userIdd)
    .then((response) => {
      console.log('Email sent:', response.status, response.text);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
    });
};

const placeOrder = (Iduser) => {
    const templateId = 'template_8enmf2h';

    const templateParams = {
                  name: localStorage.getItem('name'),
                  orderNumber: Iduser,
                  email:localStorage.getItem('email'),
                  message:'Thank you for placing the order! Your order has been successfully received.'
              
    };
    sendEmail('JvaR7f-e2Yxvm0-kt', templateId, templateParams); 
  };



export default function PlaceOrder({ history }) {
    const userId=localStorage.getItem('id')
        const shippingAddress=JSON.parse([localStorage.getItem('shippingDetails')])
        const total=[localStorage.getItem('totalcart')]
        const paymentMethod =localStorage.getItem('paymentMethod')
        const cart =JSON.parse(localStorage.getItem('cart')) ;
        const cartId =JSON.parse(localStorage.getItem('cartID')) ;
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              "Content-type": "multipart/form-data",
        
            },
          };
        // console.log(cart);
        let navigate=useNavigate()
        if (!paymentMethod) {
                navigate('/payment')
        }
        const shippingPrice= (total > 100 ? 0 : 10).toFixed(2)
        const taxPrice=Number((0.082) * total).toFixed(2)
        const totalPrice=(Number(total) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
        let itemPrice=0
       

        // const uploadImageHandler = async (e) => 
        async function dellcart(id){
            await axiosistance.delete(`/cart/deletecartuser/${id}`,config)
            }
        const sendorder = async ()=> {
                try{

                       
                    const {data}=await axiosistance.post(`/order/add/`,{
                        userId,
                        'cartId':[cartId],
                        'address':shippingAddress.address,
                        'city':shippingAddress.city,
                        'postalCode':shippingAddress.postalCode,
                        'country':shippingAddress.country,
                        'itemPrice':total,
                        paymentMethod,
                        shippingPrice,
                        taxPrice,
                        totalPrice},
                        config)
                        // console.log(data)
                        placeOrder(data.id)
                        dellcart(userId)
                        navigate(`/order/${data.id}`)
                        // history.push(`/order/${data.id}`)
                }
               catch(error){
                console.log(error.response)
               }
        }
        
       
        // useEffect(()=>{
        //         sendorder();
              
        //   },[])

  return <>
  <div className="container">
   <CheckoutSteps step1 step2 step3 step4 />
  <div className="row">
    <div className="col-md-8">
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <h2>Shipping</h2>
                <p>
                    <strong>Shipping: </strong>
                    {shippingAddress.address}, {shippingAddress.city}
                    {'  '}
                    {shippingAddress.postalCode},
                    {'  '}
                    {shippingAddress.country}
                </p>
            </li>
            <li className="list-group-item">
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {paymentMethod}
                </p>
            </li>
            <li className="list-group-item">
                <h2>Order Items</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {cart.map((item, index) => (
                            <li className="list-group-item" key={index}>
                                <div className="row">
                                    <div className="col-md-1">
                                        <img src={"http://localhost:8000" + item.product[0].image} alt={item.product[0].name} className="img-fluid rounded" />
                                    </div>
                                    <div className="col-md">
                                        <Link to={`/product/${item.product}`}>{item.product[0].name}</Link>
                                    </div>
                                    <div className="col-md-4">
                                        {item.product_qty} X ${item.product[0].price} = ${(item.product_qty * item.product[0].price).toFixed(2)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </li> 
        </ul>
    </div>
    <div className="col-md-4">
        <div className="card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h2>Order Summary</h2>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">Items:</div>
                        <div className="col">${total}</div>
                    </div>
                </li>
                 <li className="list-group-item">
                    <div className="row">
                        <div className="col">Shipping:</div>
                        <div className="col">{shippingPrice}</div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">Tax:</div>
                        <div className="col">{taxPrice}</div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">TotalPrice:</div>
                        <div className="col">{totalPrice}</div>
                    </div>
                </li>
               {/* <li className="list-group-item">
                    {error && <p className="text-danger">{error}</p>}
                </li>*/}
                <li className="list-group-item">
                    <button
                        type="button"
                        className="btn btn-dark"
                        disabled={cart.length === 0}
                        onClick={sendorder}
                    >
                        Place Order
                    </button>
                </li> 
            </ul>
        </div>
    </div>
</div>
  </div>

  </>
}
