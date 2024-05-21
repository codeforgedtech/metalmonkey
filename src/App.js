import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import requireAuth from "./requireAuth";

import AdminPage from "./component/Admin/Index";
import LoginPage from "./component/Login";
import RegisterPage from "./component/Register";
import UserPage from "./component/Admin/Users/UserPage";
import EditBlogPost from "./component/Admin/Posts/EditBlogPostPage";
import CreateBlogPost from "./component/Admin/Posts/CreateBlogPost";
import AllBlogPosts from "./component/Admin/Posts/AllBlogPosts";
import BandDetailsPage from './component/Posts/BandDetailsPage';
import AlbumDetailsPage from './component/Posts/AlbumDetailsPage';
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./component/Home";
import PostDetails from "./component/Posts/PostDetails";
import LabelDetailsPage from "./component/Posts/LabelDetailsPage";
import CountryDetailsPage from "./component/Posts/CountryDetailsPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/admin/allposts"
          element={<AllBlogPosts />}
          canActivate={() => requireAuth({ isLoggedIn })}
        />
        <Route
          path="/admin/users"
          element={<UserPage />}
          canActivate={() => requireAuth({ isLoggedIn })}
        />
        <Route
          path="/admin/createPost"
          element={<CreateBlogPost />}
          canActivate={() => requireAuth({ isLoggedIn })}
        />
        <Route
          path="/admin"
          element={<AdminPage />}
          canActivate={() => requireAuth({ isLoggedIn })}
        />
        <Route
          path="/admin/editPost/:postId"
          element={<EditBlogPost />}
          canActivate={() => requireAuth({ isLoggedIn })}
        />

        {/* Inloggningssidan */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        {/* Registreringssidan */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Andra routes här */}
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/band-member/:member" element={<BandDetailsPage/>} />
        <Route path="/band/:band" element={<AlbumDetailsPage/>} />
        <Route path="/label/:label" element={<LabelDetailsPage/>} />
        <Route path="/country/:country" element={<CountryDetailsPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
