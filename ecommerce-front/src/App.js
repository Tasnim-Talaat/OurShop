import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import NotFound from './Component/NotFound/NotFound'
import Layout from './Component/Layout/Layout';
import ProductList from './Component/ProductList/ProductList';
import Product from './Component/Product/Product';
import ProductSearch from './Component/ProductSearch/ProductSearch';
import Collection from './Component/Collection/Collection';
import CollectionDetail from './Component/CollectionDetail/CollectionDetail';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import AddProduct from './Component/AddProduct/AddProduct';
import EditProduct from './Component/EditProduct/EditProduct';
import ListProduct from './Component/ListProduct/ListProduct';
import ListUser from './Component/ListUser/ListUser';
import EditUser from './Component/EditUser/EditUser';
import AddUser from './Component/AddUser/AddUser';
import Addcategory from './Component/AddCategory/Addcategory';
import ListCategory from './Component/ListCategory/ListCategory';
import EditCategory from './Component/EditCategory/EditCategory';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import WishList from './Component/WishList/WishList';
import Checkout from './order/Checkout';
import Shipping from './order/Shipping';
import Payment from './order/Payment';
import PlaceOrder from './order/PlaceOrder';
import Order from './order/Order';
import ListOrder from './order/ListOrder';
import MyOrder from './order/MyOrder';
import Orders from './order/Orders';
import Contact from './Component/ContactUs/ContactUs';



function App() {
  let Routing = createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'register', element:<Register />},
      {path:'login', element:<Login />},
      {path:'pl', element:<ProductList />},
      {path:'search', element:<ProductSearch/>},
      {path:'p', element:<Product />},
      {path:'add/', element:<AddProduct />},
      {path:'productlist/edit/:id', element:<EditProduct />},
      {path:'productlist/:id', element:<ProductDetails />},
      {path:'collection', element:<Collection />},
      {path:'listproduct', element:<ListProduct />},
      {path:'userlist/edit/:id', element:<EditUser />},
      {path:'listuser', element:<ListUser />},
      {path:'adduser', element:<AddUser />},
      
      {path:'addcat', element:<Addcategory />},
      {path:'editcat/:id', element:<EditCategory />},
      {path:'catlist/', element:<ListCategory />},
      {path:'collection/:name', element:<CollectionDetail />},
      {path:'cart', element:<Cart />},
      {path:'wishlist', element:<WishList />},
      {path:'checkout', element:<Checkout/>},
      {path:'shipping', element:<Shipping/>},
      {path:'payment', element:<Payment/>},
      {path:'placeorder', element:<PlaceOrder/>},
      {path:'order/:id', element:<Order/>},
      {path:'orders/:id', element:<Orders/>},
      {path:'listorder', element:<ListOrder/>},
      {path:'myorder', element:<MyOrder/>},
      {path:'contact', element:<Contact/>},

      

      
 
      
      {path:'*', element:<NotFound />},
    ]},
  

  ])
  return <>
   <RouterProvider router={Routing} />
 
       
  </>
}

export default App;
