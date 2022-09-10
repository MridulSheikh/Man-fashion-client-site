import "./App.css"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Footer from "./components/Shared/Footer";
import Login from "./pages/Login";
import Navigation from "./components/Shared/Navigation";
import Singup from "./pages/Singup";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
