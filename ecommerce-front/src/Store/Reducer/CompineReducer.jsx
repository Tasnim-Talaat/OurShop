import { combineReducers } from "redux"
import getProductList from './ProductReducer/ProductReducer'
import countCarts from './Cart'
import countwishlists from './wishlist'
export default combineReducers({
        counter:countCarts,
        getProductList:getProductList,
        counterw:countwishlists,


})