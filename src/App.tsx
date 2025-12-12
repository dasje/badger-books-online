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
        <Route path="/admin" element={<Admin />} />
        <Route path="/webshop" element={<Shop />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
