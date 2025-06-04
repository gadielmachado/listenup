import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MyLessons from "./pages/MyLessons";
import Profile from "./pages/Profile";
import Lesson from "./pages/Lesson";
import LessonComplete from "./pages/LessonComplete";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => (
  <AuthProvider>
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="my-lessons" element={<MyLessons />} />
            <Route path="profile" element={<Profile />} />
            <Route path="lesson/:id" element={<Lesson />} />
            <Route path="lesson/:id/complete" element={<LessonComplete />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  </AuthProvider>
);

export default App;
