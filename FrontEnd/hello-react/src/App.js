import './App.css';
import Product from './pages/Product';
import Home from './pages/Home';
import Category from './pages/Category';
import Register from './pages/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/auth/Login';
import ProtectedRoutes from './pages/utils/ProtectedRoutes';
import AddProducts from './pages/AddProducts';
import Stocks from './pages/Stocks';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/stocks" element={<Stocks />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
