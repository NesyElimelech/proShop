import React from 'react';
// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components and Screens
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import ProductScreen from './pages/ProductScreen';
import ProductsListScreen from './pages/ProductsListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderDetailsScreen from './pages/OrderDetailsScreen';
import UsersListScreen from './pages/UsersListScreen';
import UserEditScreen from './pages/UserEditScreen';
import OrdersListScreen from './pages/OrdersListScreen';

// Styles
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="py-2" fluid>
        <main className="py-5 px-5">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderDetailsScreen} />
          <Route path="/admin/userslist" component={UsersListScreen} exact />
          <Route
            path="/admin/userslist/:pageNumber"
            component={UsersListScreen}
            exact
          />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productslist"
            component={ProductsListScreen}
            exact
          />
          <Route
            path="/admin/productslist/:pageNumber"
            component={ProductsListScreen}
            exact
          />
          <Route path="/admin/orderslist" component={OrdersListScreen} exact />
          <Route
            path="/admin/orderslist/:pageNumber"
            component={OrdersListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
