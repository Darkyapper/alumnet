import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import FeedPage from "./pages/FeedPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<FeedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
