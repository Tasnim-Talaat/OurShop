import Axios  from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Addcategory() {
        const[id,setId]=useState()
        const[name,setName]=useState('')
        const[image,setImage]=useState('')
        const [error ,setError]=useState([])

        const [isLoading , setIsLoading]=useState(false)
        let navigate =useNavigate()
        const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-type': 'multipart/form-data',
                },
              };
        const uploadImageHandler = async (e) => {
                const file = e.target.files[0];
                // console.log('ffff',file)
                const formData = new FormData();
                formData.append('image', file);
                formData.append("name", name);
            
            
                try {
                  const { data } = await Axios.post('http://localhost:8000/product/uploadcate/', formData, config);
                  // console.log('ddd',data);
                  setImage(data.image);
                  // console.log('iiiiii',image)
                
                } catch (error) {
                  console.log(error);
                }
              };
        
    



        const handleSubmit=(e)=>{
                
                e.preventDefault()
               
                navigate('/collection')
            
                setIsLoading(true)
         

        }

  return <>
  <div className="container py-5">
      <div className="row">
        <h1 className="border-bottom w-50 py-3">Add Category</h1>
        <div className="form">
          <form onSubmit={handleSubmit} className="">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control my-3" onChange={(e) => setName(e.target.value)} />

            <label htmlFor="image">Image</label>
            <input type="file" id="image" className="form-control my-3" onChange={uploadImageHandler}  />


            <button className="btn btn-primary my-5">Add Category</button>
          </form>
        </div>
      </div>
    </div>
  </>
}
