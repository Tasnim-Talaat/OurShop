import React from 'react'
import { Link } from 'react-router-dom'


export default function ProductSearching({products:{id,name,description,image,rating,price}}) {
  return <>
        <div className="col-md-3 rounded ">
                <div className='ss border rounded position-relative'>
            <img className='w-100' src={"http://localhost:8000/image/" + image} />
            <span className='position-absolute bg-warning py-1  px-3 start-0 rounded shadow'>{price}$</span>
            <span className='position-absolute bg-danger py-1  px-3 end-0 rounded shadow'>{Math.round(rating)}</span>

            <div className='px-3'>
                <h3>{name.split(' ').splice(0,3).join(' ')}</h3>
                <h6>{description.split(' ').splice(0,5).join(' ')}</h6>

                <Link className="btn btn-primary w-100 my-3" to={`/productList/${id}`}>
              show more
            </Link>
           </div></div></div>
     
  </>
}
