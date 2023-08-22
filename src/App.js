import { React, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./forms/signIn";
import SignUp from "./forms/signUp";
import PostsPage from "./post/postsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import CreatePost from "./post/createPost";
import EditPost from "./post/editPost";
import ReadMore from "./post/readMore";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/feed/:userId" element={<PostsPage />} />
          <Route path="/feed/:userId/:id" element={<PostsPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/createPost/:userId" element={<CreatePost />} />
          <Route path="/editPost/:userId/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<ReadMore />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
