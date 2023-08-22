import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const storedData = localStorage.getItem('allPosts');
  const allPosts = JSON.parse(storedData);
  const params = useParams();
  const foundPost = allPosts.find(post => post.userId === params.userId && post.id === params.id);
  const navigation = useNavigate();

  const [title, setTitle] = useState(foundPost.title);
  const [body, setBody] = useState(foundPost.body);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = foundPost.userId;
    const id = foundPost.id;
    const updatedPost = { userId, title, body, id };
    const updatedPosts = allPosts.map((post) => {
      if (post.userId === userId && post.id === params.id) {
        return updatedPost;
      }
      return post;
    });
    localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
    alert('Post updated successfully');
    navigation(`/feed/${params.userId}`);
    console.log("Updated post:", { userid: foundPost.id, title, body });
  };

  return (
    <div className="container">
      {foundPost && (
        <div className="card mt-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea
                  className="form-control"
                  id="body"
                  rows="4"
                  value={body}
                  onChange={handleBodyChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
