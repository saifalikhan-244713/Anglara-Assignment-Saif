import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Addpost from "./pages/Addpost";
import Mypost from "./pages/Mypost";
import EditPost from "./pages/Editpost";
import Postdetail from "./pages/Postdetail";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/post" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-post" element={<Mypost />} />
          <Route path="/add-post" element={<Addpost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/post/:id" element={<Postdetail />} /> {/* Post detail route */}
          </Routes>
      </Router>
    </>
  );
};

export default App;