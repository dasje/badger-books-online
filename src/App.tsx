import React from "react";
import "./App.css";
import AppAppBar from "./blog-components/AppAppBar";
import Themeify from "./Themeify";
import Footer from "./blog-components/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Blog /> */}
        <Themeify>
          <AppAppBar />
          <Footer />
        </Themeify>
      </header>
    </div>
  );
}

export default App;
