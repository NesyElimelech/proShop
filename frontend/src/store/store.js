import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// reducers
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

// Combine all reducers to one variable so it can pass to the createStore
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};
// So we can do async operations with our database and state management
const middleware = [thunk];

// Connecting the app to redux
const store = createStore(
  reducer,
  initialState,
  //   Make the redux extension works with our app on the web
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
