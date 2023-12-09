import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UsersList from "./components/UsersList";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                Nice Software Solution
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="auth-wrapper">
            <Routes>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Registration />} />
              <Route path="/list" element={<UsersList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
