import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
//User routes
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/user/Home";
import MovieDetail from "./pages/user/MovieDetail";
import Cart from "./pages/user/Cart";
import Order from "./pages/user/Order";

//General Routes
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyPassword from "./pages/VerifyPassword";
import ForgetPassword from "./pages/ForgetPassword";

//Admin routes
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <Routes>
      {/* General Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-password" element={<VerifyPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="movies/:slug" element={<MovieDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
