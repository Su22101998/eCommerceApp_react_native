import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { createStore, combineReducers , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';


const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders : ordersReducer,
  auth : authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
};



export default App;
//npx react-native run-android