import React, { useEffect, useState } from 'react'
import  Axios  from 'axios'
import { useNavigate,useParams} from 'react-router-dom'

export default function EditProduct() {

        const params=useParams()
  
  let navigate=useNavigate()
          const [myproduct,setMyProduct]=useState([])
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
    const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-type": "multipart/form-data",

    },
  };
   const uploadImageHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        formData.append("product_id", params.id);
    
    
        try {
          const { data } = await Axios.post('http://localhost:8000/product/upload/', formData, config);
          console.log('ddd',data);
          setImage(data);
        } catch (error) {
          console.log(error);
        }
      };
            async function getProduct(){
          const {data}=await Axios.get(`http://localhost:8000/product/product/${params.id}/`)
          // console.log('dddd',data)
          setMyProduct(data[0])
          }
  useEffect(() => {
    getProduct()
        Axios.get('http://localhost:8000/product/category/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_id:localStorage.getItem('id'),
      name: name,
      brand: brand,
      image,
      category: category,
      description: description,
      price: price,
      count_in_stock: countInStock
    };
    Axios.put(`http://localhost:8000/product/update/${params.id}/`, data,config)
      .then(response => {
        // console.log(response);
        navigate('/listproduct')
      })
      .catch(error => {
        console.log(error);
      });
  };

  return <>
  <div className="container">
    <h1>Edit product</h1>
    <div className="form">
      {/* {console.log(mycategory)} */}
        {/* {console.log(myproduct.categor
          -)} */}
      <form onSubmit={handleSubmit} className="">
      <label htmlFor="name">name</label>
      <input type="text" id='name' className='form-control my-3' placeholder={myproduct.name} onChange={(e)=>setName(e.target.value)}/>
      <label htmlFor="name">image</label>
      <input type="file" id='name' className='form-control my-3'  onChange={uploadImageHandler} placeholder={myproduct.image}/>
      <label htmlFor="description">description</label>
      <input type="textarea" id='name' className='form-control my-3' onChange={(e)=>setDescription(e.target.value)}placeholder={myproduct.description}/>
      <label htmlFor="productPrice">Price</label>
      <input type="number" id='productPrice' className='form-control my-3' onChange={(e)=>setPrice(e.target.value)} placeholder={myproduct.price}/>
      <label htmlFor="productPrice">Brand</label>
      <input type="text" id='productPrice' className='form-control my-3' onChange={(e)=>setBrand(e.target.value)} placeholder={myproduct.brand}/>
       <div className='mb-3'>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select " aria-label="Default select example">
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

      <label htmlFor="productPrice">Count_in_stock</label>
      <input type="number" id='productPrice' className='form-control my-3'placeholder={myproduct.count_in_stock} onChange={(e)=>setCountInStock(e.target.value)} />
      <button className='btn btn-primary my-5'>Edit Product</button>
      </form>
    </div>
  </div>
  </>
}
