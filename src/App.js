import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/style.scss";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/admin/Dashboard";
import ViewProfiles from "./components/social/ViewProfiles";

function App() {
  return (
    <>
      <div className="wrapper">
        <Router>
          <Navigation />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/dashboard/posts" element={<ViewProfiles />}></Route>
              <Route
                path="/dashboard/profiles"
                element={<ViewProfiles />}
              ></Route>
              <Route
                path="/dashboard/createpost"
                element={<ViewProfiles />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
