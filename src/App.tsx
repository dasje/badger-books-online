import React from "react";
import "./App.css";
import AppAppBar from "./blog-components/AppAppBar";
import Themeify from "./Themeify";
import Footer from "./blog-components/Footer";
import Blog from "./Blog";

function App() {
  return (
    <div className="App">
      <Themeify>
        <header className="App-header">
          <AppAppBar />
        </header>
        <body>
          <Blog />
        </body>
        <Footer />
      </Themeify>
    </div>
  );
}

export default App;
