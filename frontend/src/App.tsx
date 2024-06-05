import { ProtectedRoute } from "./components/protected-route";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { Register } from "./pages/register";
import { Home } from "./pages/home";

const Logout = () => {
  localStorage.clear();
  return <Navigate to={"/login"} />;
};

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<RegisterAndLogout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
