import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return <>
  <Navbar/>
  <div className="layout py-5 my-4">
  <Outlet>
  </Outlet>
  </div>
 
  <Footer/>
  </>
}
