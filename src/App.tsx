import "./App.css"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Footer from "./components/Shared/Footer";
import Login from "./pages/Login";
import Navigation from "./components/Shared/Navigation";
import Singup from "./pages/Singup";
import Shop from "./pages/Shop";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
