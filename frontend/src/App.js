import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Products from "./pages/products/Products";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRouter>
                <Products />
              </ProtectedRouter>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRouter>
                <Cart />
              </ProtectedRouter>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function ProtectedRouter({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
