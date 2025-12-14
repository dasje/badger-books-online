import React from "react";
import "./App.css";
import AppAppBar from "./core-components/AppAppBar";
import Footer from "./core-components/Footer";
import Blog from "./Blog";
import { Route, Routes } from "react-router-dom";
import Projects from "./Projects";
import Main from "./Main";
import BlogEntry from "./blog-components/BlogEntry";
import NewBlog from "./blog-components/NewBlog";
import Admin from "./Admin";
import Workshops from "./Workshops";
import Shop from "./Shop";
import Login from "./db/auth/Login";
import ProtectedRoute from "./db/auth/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppAppBar />
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogId" element={<BlogEntry />} />
        <Route path="/blog/new" element={<NewBlog />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/webshop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
