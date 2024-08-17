import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Home';
import { Container } from '@mui/material';
import CartPage from './Components/CartPage';
import Navbar from './navbar/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';

const App = () => {
  return (
    <Provider store={store}>
      < Router >
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Container>
      </Router >
    </Provider>
  )
}

export default App