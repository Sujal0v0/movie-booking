import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/"></Route>
      <Route path="/admin"></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};

export default App;
