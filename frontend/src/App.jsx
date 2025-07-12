import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UserCreate from "./components/UserCreate";
import LayOutWithNavbar from "./components/LayOutWithNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setting from "./components/Setting";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserCreate />} />
          <Route path="/login" element={<Login />} />
          <Route element={<LayOutWithNavbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
