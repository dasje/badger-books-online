import React from "react";
import "./App.css";
import AppAppBar from "./core-components/AppAppBar";
import Footer from "./core-components/Footer";
import Blog from "./Blog";
import { Route, Routes } from "react-router-dom";
import Projects from "./Projects";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppAppBar />
      </header>
      <Routes>
        <Route path="/" />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
