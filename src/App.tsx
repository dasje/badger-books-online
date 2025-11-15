import React from "react";
import "./App.css";
import AppAppBar from "./blog-components/AppAppBar";
import Themeify from "./Themeify";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Blog /> */}
        <Themeify>
          <AppAppBar />
        </Themeify>
      </header>
    </div>
  );
}

export default App;
