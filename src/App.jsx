import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Hehe } from "./pages/heh";
import { Home } from "./pages/home";
import {Login} from "./pages/login"
import { PrivateRoute } from "./pages/privateRoute";
import { SignIn } from "./pages/signup";

function App() {
  return (
    // <Router>
    //   <AuthProvider>
    //     <Routes>
    //     <Route path="/" element={<Hehe/>} />
    //     <Route path="/home" element={<PrivateRoute ><Home/></PrivateRoute>} />
    //     <Route path="/signup" element={<SignIn/>} />
    //     <Route path="/login" element={<Login/>} />
    //     </Routes>
    //   </AuthProvider>
    // </Router>
    <Home />
  );
}

export default App;