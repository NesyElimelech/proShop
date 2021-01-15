import React from 'react';
// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components and Screens
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import ProductScreen from './pages/ProductScreen';
// Styles
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <Container className="py-5">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
