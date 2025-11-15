import React from "react";
import "./App.css";
import AppAppBar from "./core-components/AppAppBar";
import Themeify from "./Themeify";
import Footer from "./core-components/Footer";
import Blog from "./Blog";

function App() {
  return (
    <div className="App">
      <Themeify>
        <header className="App-header">
          <AppAppBar />
        </header>
        <Blog />
        <footer>
          <Footer />
        </footer>
      </Themeify>
    </div>
  );
}

export default App;
