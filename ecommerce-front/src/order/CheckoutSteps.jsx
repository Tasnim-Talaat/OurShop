import React from 'react'

function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <div className="d-flex justify-content-center mb-4">
    <div className="nav-item">
        {step1 ? (
            <a href="/login" className="nav-link px-2 text-danger">Login</a>
        ) : (
            <span className="nav-link disabled px-2 ">Login</span>
        )}
    </div>

    <div className="nav-item">
        {step2 ? (
            <a href="/shipping" className="nav-link px-2 text-danger">Shipping</a>
        ) : (
            <span className="nav-link disabled px-2 ">Shipping</span>
        )}
    </div>

    <div className="nav-item">
        {step3 ? (
            <a href="/payment" className="nav-link px-2 text-danger">Payment</a>
        ) : (
            <span className="nav-link disabled px-2 ">Payment</span>
        )}
    </div>

    <div className="nav-item">
        {step4 ? (
            <a href="/placeorder" className="nav-link px-2 text-danger">Place Order</a>
        ) : (
            <span className="nav-link disabled px-2 ">Place Order</span>
        )}
    </div>
</div>

    )
}

export default CheckoutSteps
