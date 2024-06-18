//Hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";
import { watchAuthState } from "./redux/slices/authSlice";
//components
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbar";
//pages
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Inicia o monitoramento do estado de autenticação
    dispatch(watchAuthState());
  }, [dispatch]);

  return (
    <div className="bg-light-background dark:bg-dark-background min-h-screen">
      <Navbar />
      <BrowserRouter>
        <div className="flex items-center justify-center min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
