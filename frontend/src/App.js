import React from 'react';
// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components and Screens
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProductScreen from './pages/ProductScreen';
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
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
