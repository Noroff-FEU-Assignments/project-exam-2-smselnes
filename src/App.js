import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/style.scss";
import Navigation from "./components/layout/Navigation";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import Footer from "./components/layout/Footer";
import DashboardPage from "./components/dashboard/DashboardPage";
import { AuthProvider } from "./context/AuthContext";
import PostDetails from "./components/social/posts/PostDetails";
import ProfileDetails from "./components/social/profiles/ProfileDetails";
import ProfilesPage from "./components/social/profiles/Profiles";
import OwnProfilePage from "./components/dashboard/OwnProfilePage";
import Posts from "./components/social/posts/Posts";

function App() {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/dashboard/" element={<DashboardPage />}></Route>
            <Route path="/dashboard/:name" element={<OwnProfilePage />}></Route>
            <Route path="/dashboard/posts" element={<Posts />}></Route>
            <Route
              path="/dashboard/posts/:id"
              element={<PostDetails />}
            ></Route>
            <Route
              path="/dashboard/profiles"
              element={<ProfilesPage />}
            ></Route>
            <Route
              path="/dashboard/profiles/:name"
              element={<ProfileDetails />}
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
