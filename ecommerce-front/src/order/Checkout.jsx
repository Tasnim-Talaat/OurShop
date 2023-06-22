import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = ({ products, handlePayment }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleToken = (token) => {
    const paymentData = {
      token: token,
      address: address,
      city: city,
      postalCode: postalCode,
      products: products,
    };
    handlePayment(paymentData);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form>
        <label>Address</label>
        <input type="text" value={address} onChange={handleAddressChange} />
        <label>City</label>
        <input type="text" value={city} onChange={handleCityChange} />
        <label>Postal Code</label>
        <input type="text" value={postalCode} onChange={handlePostalCodeChange} />
      </form>
      <StripeCheckout
        token={handleToken}
        stripeKey="YOUR_STRIPE_PUBLISHABLE_KEY"
        amount={products * 100}
        currency="USD"
      />
    </div>
  );
};

export default Checkout;

