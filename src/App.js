import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/style.scss";
import Navigation from "./components/layout/Navigation";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import Footer from "./components/layout/Footer";
import DashboardPage from "./components/dashboard/DashboardPage";
import ViewProfiles from "./components/social/profiles/ViewProfiles";
import ViewPosts from "./components/social/posts/ViewPosts";
import { AuthProvider } from "./context/AuthContext";
import PostDetails from "./components/social/posts/PostDetails";
import SettingsPage from "./components/dashboard/SettingsPage";
import CreateNewPost from "./components/dashboard/CreateNewPost";
import ProfileDetails from "./components/social/profiles/ProfileDetails";
import ProfilesPage from "./components/social/profiles/ProfilesPage";

function App() {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Router>
          <Navigation />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/dashboard" element={<DashboardPage />}></Route>
              <Route path="/dashboard/posts" element={<ViewPosts />}></Route>
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
              <Route
                path="/dashboard/createpost"
                element={<CreateNewPost />}
              ></Route>

              <Route
                path="/dashboard/settings"
                element={<SettingsPage />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
