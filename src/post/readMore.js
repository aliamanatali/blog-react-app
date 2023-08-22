import React from 'react';
import { useParams } from 'react-router-dom';

const ReadMore = () => {
  const storedData = localStorage.getItem('allPosts');
  const allPosts = JSON.parse(storedData);
  const params = useParams();
  const foundPost = allPosts.find(post => post.id === params.id);
  

  return (
    <div className="container">
      {foundPost && (
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">{foundPost.title}</h2>
            <p className="card-text">{foundPost.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
