import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/addUser" element={<AddEditUser />} />
        <Route path="/editUser/:id" element={<AddEditUser />} />
        <Route path="/userInfo/:id" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
