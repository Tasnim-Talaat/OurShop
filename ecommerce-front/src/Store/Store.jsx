import reducer from './Reducer/CompineReducer';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';


const Store=createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
export default Store;
