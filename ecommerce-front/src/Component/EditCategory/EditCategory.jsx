import React, { useEffect, useState } from 'react'
import  Axios  from 'axios'
import { useNavigate,useParams} from 'react-router-dom'

export default function EditCategory() {
        const params=useParams()
        const [name,setName]=useState('')
        const [category,setCategory]=useState([])
        const [image,setImage]=useState('')
        let navigate=useNavigate()
        const [mycategory,setMyCategory]=useState([])
        async function getCategory(){
                const {data}=await Axios.get(`http://localhost:8000/product/category/${params.id}`)
                setMyCategory(data[0])
                console.log(mycategory)
        }
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-type": "multipart/form-data",
          },
        };
        const uploadImageHandler = async (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append("image", file);
          formData.append("category_id", params.id);
          console.log(file)
          console.log(params.id)
          console.log(formData)
        try {
          

                const { data } = await Axios.post(
                        "http://localhost:8000/product/uploadcat/",
                        formData,
                        config
                        
                        );
                        console.log(data)
    
          setImage(data);
          // console.log(image)
          

        } catch (error) {
          console.log(error)
        }
      };
    

              async function EditCategory(){
                
                try{
             const {data}=await Axios.put(`http://localhost:8000/product/updatecat/${params.id}/`,{name:name,image:image},config)
                      // setProduct(data)
                //       console.log('cccc',category)
                      console.log('image',image)
                }
                catch(error){
                  console.log(error)
        
        
            }
              }
              useEffect(() => {
                getCategory()
              }, []);
            
        const formSubmit=(e)=>{
                e.preventDefault()
                EditCategory()
                navigate('/catlist')
              }
  return <>
<div className="container">
    <h1>Edit product</h1>
    <div className="form">
      {/* {console.log(mycategory)} */}
        {/* {console.log(myproduct.categor
          -)} */}
      <form onSubmit={formSubmit} className="">
      <label htmlFor="name">name</label>
      <input type="text" id='name' className='form-control my-3' placeholder={mycategory.name} onChange={(e)=>setName(e.target.value)}/>
      <label htmlFor="name">image</label>
      <input type="file" id='name' className='form-control my-3'  onChange={uploadImageHandler} placeholder={mycategory.image}/>
      
      <button className='btn btn-primary my-5'>Edit Product</button>
      </form>
    </div>
  </div>
  </>
}
