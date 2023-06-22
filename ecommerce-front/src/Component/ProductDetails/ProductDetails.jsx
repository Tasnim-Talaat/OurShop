import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CartCount } from '../../Store/Action/Cart'
import Rating from '../Rating/Rating'


import { useParams } from 'react-router-dom'
import { WishlistCount } from '../../Store/Action/wishlist';
export default function ProductDetails() {
        let count=useSelector((state)=>state.counter.count)
        let countw=useSelector((state)=>state.counterw.countw)
        const dispatch =useDispatch()
        const handlecount=()=>{
          dispatch(CartCount(count=count+1))

        }
        const handlecountw=()=>{
          dispatch(WishlistCount(countw=countw+1))

        }
        const [quantity,setQuantity]=useState(1)
        const user=localStorage.getItem('id')
       const handleQuantity=(e)=>{
       setQuantity(e.target.value)
       
}
       const IncreesQuantity=(e)=>{

        const q=quantity+1
       setQuantity(q)
       
}
       const decreesQuantity=(e)=>{
               const q=quantity-1
        setQuantity(q)
       
}

        const params=useParams()
        const [review, setReview]=useState(
                {
                        product:params.id,
                        name:`${localStorage.getItem('name')}`,
                        comment:'',
                        rating:0,
                        user:localStorage.getItem('id')
                }
        )
        // console.log(params.id)
        const [product,setProduct]=useState([])
        let navigate =useNavigate()
        const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  "Content-type": "multipart/form-data",
            
                },
              };
        function registerUserData(e){
                let  newRev={...review}
                newRev[e.target.name]=e.target.value;
                // console.log(newRev)
                  setReview(newRev)
          }
  
        async function getProduct(){
                const {data}=await Axios.get(`http://localhost:8000/product/product/${params.id}/`)
                setProduct(data)
        }
        async function addWishlist(id){
                const {data}=await Axios.post(`http://localhost:8000/wishlist/add/`,{product_id:params.id,user_id:user},config)
                
        }
        async function addCart(id){
                const {data}=await Axios.post(`http://localhost:8000/cart/add/`,{product_id:params.id,user_id:user,product_qty:quantity},config)
                
        }
        async function getReview(){
                try{
                let data=await Axios.post(`http://localhost:8000/product/rev/${params.id}/`,review,config)
                // console.log('revvv',data)
                setReview(data)
                getProduct()
                navigate(`/productList/${params.id}`)
                }
                catch(error){
                        console.log(error.response)
                        navigate(`/productlist/${params.id}`)
          
          
                  }
        }
        
        useEffect(()=>{
                getProduct()
                // getReview()
        },[])

        function registerSubmit(e){
                e.preventDefault()
                // console.log('submit')
                
                getReview()
                // navigate('/productList')
                
         

        }
        return <>
        <div className="conainer px-3 py-3">
     
        <Link to='/' className='btn btn-dark mx-5 my-2 '>Go Back</Link>
<div className="container ">
     <div className="card shadow product_data ">
{product.map((products,index)=>
      <div className="row">
      <div className="col-md-12">
              <div className="">
                      <div className="card-body">
                              <div className="row">
      <div className="col-md-4 image-img">
         <label className="product-viewtag float-end badge bg-success py-2"> { products.brand }</label>
         <img className='w-100' src={"http://localhost:8000" + products.image} className="w-100" alt="image-img image"/>
</div>

<div className="col-md-8">
      <h2 className="mb-0">
               {products.name}
               { products.rating.rate<4 && <label className="float-end badge bg-danger trending_tag">TOPRated </label>
}
      </h2>
      <hr/>
      <label className="fw-bold">Price :{products.price }</label>
      <p className="mt-3">
              {products.description}
      </p>
      <hr/>
      {products.count_in_stock > 0 ?  <label className="badge bg-success">In stock </label>:  <label className="badge bg-danger">Out of stock</label>}
            
      <div className="row mt-2">
              <div className="col-md-3">
                      <input type="hidden" value="{ products.id}" className="prod_id"/>
                      <label for="Quantity">Quantity</label>
                      <div className="input-group text-center mb-3" >
                              <button className="input-group-text decrement-btn" onClick={decreesQuantity}>-</button>
                              <input type="text" name="quantity" className="form-control qty-input text-center" value={quantity} onInput={handleQuantity}/>
                             <button className="input-group-text increment-btn" onClick={IncreesQuantity}>+</button>
                      </div> 
              </div>
              <div className="col-md-9">
                      <br/>
                      { products.count_in_stock > 0 &&                    
<button type="button" className="btn btn-primary me-3 float-start addToCartBtn" onClick={()=>(
        addCart(product.id),
handlecount()       
)
}>Add to Cart <i className="fa fa-shopping-cart"></i></button>

}
<button type="button" className="btn btn-success me-3 float-start addToWishlist" onClick={()=>
        (addWishlist(product.id),
        handlecountw()
        )}>Add to Wishlist <i className="fa fa-heart"></i></button>

              </div>
              
      </div>
</div>
</div>
<div className="col-md-12">
<hr/>
<h3>Description</h3>
<p className="mt-3">{products.description}
</p>
<hr/>
<div className="rev">
<h4>Reviews</h4>
              {products.reviews.length === 0 && (
                <p className="text-blue"> No Reviews </p>
              )}
              <div className="text-flush">
                {products.reviews.map((rev) => (
                  <div key={rev._id}>
                    <h6 className='text-danger d-flex'>{rev.name} :
                    <Rating value={rev.rating} color="#f8e825"></Rating></h6>
                    <p>{rev.comment}</p>
                  </div>
                ))}
                </div>
                </div>


</div>
</div>
</div>
</div>
</div>
)}
  <div className="container pt-3">



                  




<h4>Write Your comment</h4>
<form  className='' method='post' onSubmit={registerSubmit}>
           
            
        
        <label htmlFor="comment">comment:</label>
        <input type="textarea" name='comment' id='comment' className='form-control w-50 mb-3'onChange={registerUserData}/>
        <label htmlFor="rating">rate:</label>
        <select name="rating" id="rating" onChange={registerUserData} className="form-select w-50"  aria-label="select example">
            <option hidden>select Rate</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
      </select>
        <button type='submit' className='btn btn-danger my-3 '>submit</button>
        {/* <Link to="/login">save</Link> */}
        </form>

</div>
</div>




</div>



        </div>
    
  </>
}
