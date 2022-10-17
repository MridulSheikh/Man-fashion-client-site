import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Footer from "./components/Shared/Footer";
import Login from "./pages/Login";
import Navigation from "./components/Shared/Navigation";
import Singup from "./pages/Singup";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Shpping from "./pages/Shpping";
import RequireAuth from "./private/route/RequireAuth";
import PageNotfound from "./pages/PageNotfound";
import ManageUser from "./pages/ManageUser";
import ManageProduct from "./pages/ManageProduct";
import ManageOrder from "./pages/ManageOrder";
import Admin from "./pages/Admin";
import Message from "./pages/Message";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={
          <RequireAuth>
            <Shpping />
          </RequireAuth>
        } />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/manageproduct" element={<ManageProduct />} />
        <Route path="/manageorder" element={<ManageOrder />} />
        <Route path="/manageadmin" element={<Admin />} />
        <Route path="/managemessage" element={<Message />} />
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    </div>
  );
}

export default App;
