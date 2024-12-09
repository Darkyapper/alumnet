import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import BoardsPage from "./pages/BoardsPage";
import MainLayout from "./layout/MainLayout";
import BoardFeedPage from "./pages/BoardFeedPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><MainLayout> <FeedPage /> </MainLayout></ProtectedRoute>} />
        <Route path="/boards" element={<ProtectedRoute><MainLayout> <BoardsPage /> </MainLayout> </ProtectedRoute>} />
        <Route path="/boards/:boardId" element={<ProtectedRoute><MainLayout> <BoardFeedPage /> </MainLayout> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
