import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PayPalButton } from "react-paypal-button-v2";
import emailjs from 'emailjs-com';

const sendEmail = (userIdd, templateId, templateParams) => {
    emailjs.send('service_enur74q', templateId, templateParams, userIdd)
      .then((response) => {
        alert('Email sent:', response.status, response.text);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };
  const closeOrder = (Iduser) => {
      const templateId = 'template_8enmf2h';
  
      const templateParams = {
                    name: localStorage.getItem('name'),
                    orderNumber: Iduser,
                    email:localStorage.getItem('email'),
                    message:'The order has been successfully canceled.'
                
      };
      sendEmail('JvaR7f-e2Yxvm0-kt', templateId, templateParams); 
    };
export default function Order() {
    const isAdmin=localStorage.getItem('isAdmin')
        const [sdkReady, setSdkReady] = useState(false)
        const [Loading, setLoading] = useState(true)
        const total=[localStorage.getItem('totalcart')]
        const [order,setOrder]=useState([])
        let navigate=useNavigate()
        const params=useParams()
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              "Content-type": "multipart/form-data",
        
            },
          };
      
          async function dellOrder(){
            try{
    
                await Axios.delete(`http://localhost:8000/order/delete/${params.id}`,config)
                closeOrder(params.id)
                navigate('/')
            }
            catch(error){
                console.log(error)
            }
            }
       
                
                  
            async function getorder(){
                try{
                    const {data}=await Axios.get(`http://localhost:8000/order/order/${params.id}`,config)
                    setOrder(data[0])
                    setLoading(false)
                }
                catch(error){
                    console.log(error)
                    setLoading(true)
    
                }
                   
            }
            async function updateOrderToPaid(paymentResult){
                    await Axios.put(`http://localhost:8000/order/paid/${params.id}/`,paymentResult,config)
                    getorder()
                    
            }
            const deliverHandler =async()=>{
                try{
                    await Axios.put(`http://localhost:8000/order/deliver/${params.id}/`,{},config)
                    navigate(`/order/${params.id}`)
                }
                catch(error){
                    console.log(error)
                }
                    
                    
            }
            
            const successPayment = (paymentResult) => {
                alert('success operation')
                updateOrderToPaid(paymentResult)
                navigate(`/myorder`)
                      };
            const addPayPalScript =async () => {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src =
                  "https://www.paypal.com/sdk/js?client-id=AL5V7Ul-7WfNexIhGmaiTXSZ0bp-ADposQ8U.7vVkeWasHXyfniLAX8r";
                script.async = true;
                script.onload = () => {
                  setSdkReady(true);
                };
                document.body.appendChild(script);
              };
           
              
            useEffect(()=>{
                    getorder();
                    if (!order.is_paid) {
                        if (!window.paypal) {
                          addPayPalScript();
                        } 
                        else {
                          setSdkReady(true);
                        }
                      }
                    }, [order.is_paid]);
      return <>
  
    {Loading? <i className='fa-solid fa-spinner'></i>:
     <div className="container">
     <div className="row">
 <h1>Order: {order.id}</h1>
 <div className='col-md-8'>
 <div>
     <h2>Shipping</h2>
     {order.user && order.user.length > 0 && (<>
   <p><strong>Name: </strong> {order.user[0].name}</p>
     <p><strong>Email: </strong><Link to={`mailto:${order.user[0].email}`}>{order.user[0].email}</Link></p>
 
     </>)}
     <p>
         <strong>Shipping: </strong>
         {order.shippingAddress[0].address},  {order.shippingAddress[0].city}
         {'  '}
         {order.shippingAddress[0].postalCode},
         {'  '}
         {order.shippingAddress[0].country}
     </p>
 
     {order.is_delivered ? (
         <div className='alert alert-success'>Delivered on {order.delivered_at}</div>
     ) : (
         <div className='alert alert-danger'>Not Delivered</div>
     )}
 </div>
 
 <div>
     <h2>Payment Method</h2>
     <p>
         <strong>Method: </strong>
         {order.payment_method}
     </p>
     {order.is_paid ? (
         <div className='alert alert-success'>Paid on {order.paid_at}</div>
     ) : (
         <div className='alert alert-danger'>Not Paid</div>
     )}
 </div>
 
 <div>
     <h2>Order Items</h2>
     {order.orderItem.length === 0 ? (
         <div>Order is empty</div>
     ) : (
         <div>
             {order.orderItem.map((item, index) => (
                 <div key={index} className='d-flex justify-content-between align-items-end'>
                     <div>
                                     <img src={"http://localhost:8000" + item.image} alt={item.name} className="img-fluid w-50 rounded h-50" />
                     </div>
                     <div>
                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                     </div>
                     <div>
                         {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                     </div>
                 </div>
             ))}
         </div>
     )}
 </div>
 </div>
 
 <div className="col-md-4">
 <div >
     <div className="card">
         <ul className="list-group list-group-flush">
             <li className="list-group-item">
                 <h2>Order Summary</h2>
             </li>
             <li className="list-group-item">
                 <div className="row">
                     <div className="col">Items:</div>
                     <div className="col">{total}</div>
                 </div>
             </li>
              <li className="list-group-item">
                 <div className="row">
                     <div className="col">Shipping:</div>
                     <div className="col">{order.shipping_price}</div>
                 </div>
             </li>
             <li className="list-group-item">
                 <div className="row">
                     <div className="col">Tax:</div>
                     <div className="col">{order.tax_price}</div>
                 </div>
             </li>
             <li className="list-group-item">
                 <div className="row">
                     <div className="col">TotalPrice:</div>
                     <div className="col">{order.total_price}</div>
                 </div>
             </li>
            {/* <li className="list-group-item">
                 {error && <p className="text-danger">{error}</p>}
             </li> */}
            
          
 <li className="list-group-item">
 {!order.is_paid  && 
     <div>
 
 <PayPalButton
                 amount={order.total_price}
                 onSuccess={successPayment}
             />
         
     </div>
 }

 {isAdmin  && order.is_paid  && !order.is_delivered && (
     <div>
         <button
             type='button'
             onClick={deliverHandler}
             className='btn btn-dark'
         >
             Mark As Delivered
         </button>
     </div>
 )}
 </li>
 {order.status === 'pending' &&!order.is_paid  &&
 
 <li className="list-group-item"><button onClick={dellOrder} className='btn btn-danger'>Cancel Order</button></li>
 }
         </ul>
     </div>
 </div>
 
 
 
 
 
 
 </div>
 
 
 </div>
 </div>
    }
      </>
    }
    
    
    
        
    
        
    
    
