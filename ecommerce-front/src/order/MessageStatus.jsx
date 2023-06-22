import React from 'react'
import emailjs from 'emailjs-com';

const sendEmail = (userId, templateId, templateParams) => {
  emailjs.send('service_ovhrlfs', templateId, templateParams, userId)
    .then((response) => {
      console.log('Email sent:', response.status, response.text);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
    });
};

const placeOrder = () => {
  const templateId = 'template_3yi7157'; 
  const templateParams = {
                username: 'اسم المستخدم',
                orderNumber: 'رقم الطلب',
                message:'Thank you for placing the order! Your order has been successfully received.'
            
  };
  sendEmail('NKpEl1mAjxk6PTNAk', templateId, templateParams); 
};

const cancelOrder = () => {

  const templateId = 'template_3yi7157';
  const templateParams = {
        username: 'اسم المستخدم',
        orderNumber: 'رقم الطلب',
        to_email:
        message:'The order has been successfully canceled.'
  };
  sendEmail('YOUR_USER_ID', templateId, templateParams);
};
export default function MessageStatus() {
  return<>
  <div>
      <button onClick={placeOrder} className='btn btn-success'>Place Order</button>
      <button onClick={cancelOrder} className='btn btn-danger'>Cancel Order</button>
    </div>
  </>
}
