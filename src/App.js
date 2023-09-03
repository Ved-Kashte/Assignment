// src/App.js

import React from "react";
import "./App.css";
import CommentList from "./components/CommentList";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Comment Filtering and Display</h1>
        </div>
         <main className="App-main">
        <CommentList />
      </main>
    </div>
  );
}

export default App;
