import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = import.meta.env.VITE_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar height={3} color="#f11946" progress={progress} />

      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="general"
              pageSize={12}
              country="us"
              category="general"
            />
          }
        />
        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="business"
              pageSize={12}
              country="us"
              category="business"
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="entertainment"
              pageSize={12}
              country="us"
              category="entertainment"
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="health"
              pageSize={12}
              country="us"
              category="health"
            />
          }
        />
        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="science"
              pageSize={12}
              country="us"
              category="science"
            />
          }
        />
        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="sports"
              pageSize={12}
              country="us"
              category="sports"
            />
          }
        />
        <Route
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="technology"
              pageSize={12}
              country="us"
              category="technology"
            />
          }
        />
        <Route
          path="/search"
          element={
            <News
              setProgress={setProgress}
              //apiKey={apiKey}    i removed it myself
              key="search"
              pageSize={12}
              country="us"
              category=""
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
