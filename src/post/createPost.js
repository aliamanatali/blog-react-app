import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigation = useNavigate();
  const params = useParams();
  const newId = uuidv4();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      const allEntries = JSON.parse(localStorage.getItem('allPosts')) || [];
      const newEntry = { userId: params.userId, id: newId , title: title, body: body, comments: [] };
      console.log(newEntry);
      allEntries.unshift(newEntry);
      localStorage.setItem('allPosts', JSON.stringify(allEntries));
      console.log(localStorage.getItem('allPosts'));
      console.log(allEntries);
      console.log(newEntry);
      alert('Post Created Successfully');
      navigation(`/feed/${newEntry.userId}`);
      return;
    }
  };

  return (
    <>
      <h2>Create Post</h2>
      <h5>Enter the following data to create a new post:</h5>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Title</p>
          <input
            type="text"
            placeholder="Title"
            value={title}
            style={{ width: '300px' }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="mt-2">Content</p>
          <textarea
            className="text-center"
            placeholder="Body"
            value={body}
            style={{ width: '300px', height: '200px' }}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <br></br>
          <button className="mt-3 btn btn-secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
