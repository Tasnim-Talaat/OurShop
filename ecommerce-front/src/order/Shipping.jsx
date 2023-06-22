import React, { useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom';

export default function Shipping() {
        
        const [address, setAddress] = useState()
    const [city, setCity] = useState()
   const [postalCode, setPostalCode] = useState()
    const [country, setCountry] = useState()

let navigate=useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
                localStorage.setItem('shippingDetails',JSON.stringify({'address':address,'city':city,'postalCode':postalCode,'country':country}))

        navigate('/payment')
    }
  return <>
 <div className="container">
  <CheckoutSteps step1 step2 />
 <h1>Shipping</h1>
  <form onSubmit={submitHandler}>
    <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
            required
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="city">City</label>
        <input
            required
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter city"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
            
        />
    </div>

    <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input
            required
            type="text"
            className="form-control"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
            required
            type="text"
            className="form-control"
            id="country"
            placeholder="Enter country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
        />
    </div>

    <button type="submit" className="btn btn-dark my-2">
        Continue
    </button>
</form>
 </div>

  </>
}
