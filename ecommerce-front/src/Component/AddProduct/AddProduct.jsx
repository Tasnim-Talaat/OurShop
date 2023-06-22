import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default  function AddProduct()  {
    let navigate=useNavigate()
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [num_reviews, setNum_reviews] = useState(0);
  const [rating, setRating] = useState(0);
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
        formData.append("name",name );
        formData.append("user_id",localStorage.getItem('id') );
        formData.append("brand",brand );
        formData.append("rating",rating );
        formData.append("price",price );
        formData.append("num_reviews",num_reviews );
        formData.append("category",category );
        formData.append("description",description );
        formData.append("count_in_stock",countInStock );
    
    
        try {
          const { data } = await axios.post('http://localhost:8000/product/uploade/', formData, config);
          // console.log('ddd',data);
          setImage(data.image);
        } catch (error) {
          // console.log(error);
          setError(error)
        }
      };
  useEffect(() => {
    axios.get('http://localhost:8000/product/category/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!error){
 navigate('/listproduct')
    }
   

  
  };

  return (
        <div className="container py-5">
      <div className="row">
        <h1 className="border-bottom w-50 py-3">Add Product</h1>
        <div className="form">
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3' >
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"  />
        </div>
        
        <div className='mb-3'>
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control"  />
        </div>
        <div className='mb-3'>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select " aria-label="Default select example">
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
        </div>
        <div className='mb-3'>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control"  />
        </div>
        <div className='mb-3'>
          <label>Num_reviews:</label>
          <input type="number" value={num_reviews} onChange={(e) => setNum_reviews(e.target.value)} className="form-control"  />
        </div>
        <div className='mb-3'>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control"  />
        </div>
        <div className='mb-3'>
          <label>Count in Stock:</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="form-control"  />
        </div>
        <div className='mb-3' >
          <label>Image:</label>
          <input type="file"  onChange={uploadImageHandler} className="form-control"  />
        </div>
        <button type="submit" className='btn btn-primary my-5'>Add Product</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

