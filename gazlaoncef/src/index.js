// src/index.js
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import RegisterPage from "views/pages/RegisterPage.js";
import LoginPage from "views/pages/LoginPage.js";
import BlogDetailPage from "views/pages/BlogDetailPage";
import BlogsPage from "views/pages/BlogsPage";
import VideosPage from "views/pages/VideosPage";
import VideoDetail from "components/VideoDetailPage/VideoDetail";
import TestPage from "views/pages/TestPage";
import TestContent from "components/TestPage/TestContent";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/videos-page" element={<VideosPage />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route
        path="/login-page"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />}
      />
      <Route path="/blogs-page" element={<BlogsPage />} />
      <Route path="/blog-detail-page/:id" element={<BlogDetailPage />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/index" replace />} />
      <Route path="/video-detail/:id" element={<VideoDetail />} />
      <Route path="/test-page" element={<TestPage />} />
      <Route path="/test-detail/:testId" element={<TestContent />} />
      <Route path="/blogs/:id" component={BlogDetailPage} />

    </Routes>
  );
}

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
