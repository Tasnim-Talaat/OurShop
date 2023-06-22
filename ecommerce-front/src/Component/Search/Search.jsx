import React, { useState } from 'react'
import { axiosistance } from '../../Network/axiosistance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductLists } from '../../Store/Action/ProductAction/ProductAction'



export default function Search() {
  let navigate =useNavigate()
  const dispatch =useDispatch()
  const [search, setSearch] = useState()
  function SearchSubmit(e){
    e.preventDefault()
    if (search) {
      dispatch(getProductLists(search ))
        .then(() => {
          navigate(`/search/?search=${search}`);
        })
        .catch((err) => console.log(err));
    } else {
      navigate('/');
    }
       
          

       

  }
  return <>
   <form className="d-flex" onSubmit={SearchSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)}/>
        <button className="btn btn-outline-light " type="submit"> <i className='fa-solid fa-magnifying-glass text-white'></i> </button>
      </form>
  </>
}
