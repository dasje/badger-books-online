import React from "react";
import "./App.css";
import AppAppBar from "./core-components/AppAppBar";
import Footer from "./core-components/Footer";
import Blog from "./Blog";
import { Route, Routes } from "react-router-dom";
import Projects from "./Projects";
import Main from "./Main";
import BlogEntry from "./blog-components/BlogEntry";

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
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
