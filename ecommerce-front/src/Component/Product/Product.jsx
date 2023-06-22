import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Product({products:{id,name,description,image,rating,price}}) {
  let navigate =useNavigate()
  const params=useParams()
 
  return <>
        <div className="col-md-3 rounded py-2 position-relative">
          <div className="card h-100">
          <div className=" image-img ">
                <div className='   '>
            <img className='w-100 ' src={"http://localhost:8000" + image} />
            <span className='position-absolute bg-warning   px-3 start-0 rounded shadow'>{price}$</span>
            <span className='position-absolute bg-danger   px-3 end-0 rounded shadow'>{rating.rate}</span>
            </div>
            </div>
            <div className='px-3 ' >
                <h3>{name.split(' ').splice(0,3).join(' ')}</h3>
                <p>{description.split(' ').splice(0,5).join(' ')}</p>

                <Link className="btn btn-primary w-100 my-3 " to={`/productList/${id}`}>
              show more
            </Link>
            </div>
          
           </div>
           </div>
     
  </>
}
