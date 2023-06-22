import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'

export default function Payment() {
        const [paymentMethod, setPaymentMethod] = useState('PayPal')
        let navigate=useNavigate()
        const shippingAddress=localStorage.getItem('shippingDetails')

        if (!shippingAddress.address) {
                navigate('/shipping')
            }
        
           
        const submitHandler = (e) => {
                e.preventDefault()
                localStorage.setItem('paymentMethod',paymentMethod)
                navigate('/placeorder')
            }
  return <>
     <div className="container">
   <CheckoutSteps step1 step2 step3/>
     <h1>payment Method</h1>
            <form onSubmit={submitHandler}>
    <div className="form-group">
        {/* <label>payment Method</label> */}
        <div>
            <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal or Credit Card"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal or Credit Card</label>
        </div>
    </div>
    <button type="submit" className="btn btn-dark my-3">
        Submit
    </button>
</form>
     </div>
  </>
}
