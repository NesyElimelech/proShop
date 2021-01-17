import React from 'react';
// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components and Screens
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceorderScreen from './pages/PlaceorderScreen';
import OrderDetailsScreen from './pages/OrderDetailsScreen';

// Styles
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="py-2 container">
        <main className="py-5">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceorderScreen} />
          <Route path="/order/:id" component={OrderDetailsScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
