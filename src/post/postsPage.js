import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PostsPage = () => {
  const [myData, setMyData] = useState([]);
  const [comment, setComment] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const navigation = useNavigate();
  const params = useParams();
  const newId = uuidv4();

  const handleEditComment = (post, id) => {
    const updatedPosts = allPosts.map((p) => {
      if (p.id === post.id) {
        const updatedComments = p.comments.map((comment) => {
          if (comment.id === id) {
            const updatedComment = prompt('Enter the edited comment:', comment.comment);
            return { ...comment, comment: updatedComment || comment.comment };
          }
          return comment;
        });
        return { ...p, comments: updatedComments };
      }
      return p;
    });
  
    setAllPosts(updatedPosts);
    localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
  };
  
  
  const handleDeleteComment = (post, id) => {
    const updatedPost = {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== id),
    };

    const updatedPosts = allPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p));

    setAllPosts(updatedPosts);
    localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
  };

  const handleComment = (e, post) => {
    e.preventDefault();
    if (post && comment) {
      const updatedPosts = allPosts.map((p) => {
        if (p.id === post.id) {
          const newCom = { userId: post.userId, id: newId, comment: comment };
          return { ...p, comments: [...p.comments, newCom] };
        }
        return p;
      });

      setAllPosts(updatedPosts);
      localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
      setComment('');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const modifiedData = response.data.map((post) => ({ ...post, comments: [] }));
        setAllPosts(modifiedData);
        localStorage.setItem('allPosts', JSON.stringify(modifiedData));
      } catch (error) {
        console.log(error);
      }
    };

    const storedPosts = localStorage.getItem('allPosts');
    if (storedPosts) {
      setAllPosts(JSON.parse(storedPosts));
    } else {
      fetchData();
    }
  }, []);

  const handleEdit = (post) => {
    navigation(`/editPost/${post.userId}/${post.id}`);
  };

  const handleDelete = (id) => {
    const updatedPosts = allPosts.filter((post) => {
      return id !== post.id;
    });

    setAllPosts(updatedPosts);
    localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
    alert('Post deleted successfully');
    navigation(`/feed/${params.userId}`);
  };

  const funmove = () => {
    navigation(`/createPost/${params.userId}`);
  };

  return (
    <>
      <div className="mainDiv">
        <h1>Feed</h1>
        <button className="btn btn-secondary" title="crPost" id="createPost" onClick={funmove}>
          Create Post
        </button>
      </div>

      <div className="grid">
        {allPosts &&
          allPosts.map((post) => {
            const { body, userId, title } = post;
            const isCurrentUserPost = params.userId === userId;

            return (
              <div key={userId} className="card">
                <h3>{title.slice(0, 18).toUpperCase()}</h3>
                <p style={{ textAlign: 'justify' }}>{body.slice(0, 200)}</p>

                <div>
                  <h4>Comments:</h4>
                  <div key={post.id}>
                    {post.comments &&
                      post.comments.map((comm) => (
                        <div key={`${post.id}-${comm.id}`}>
                          <p>{comm.comment}</p>
                          {post.userId === params.userId && (
                            <div>
                              <button onClick={() => handleEditComment(post, comm.id)}>Edit</button>
                              <button onClick={() => handleDeleteComment(post, comm.id)}>Delete</button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  
                </div>

                <button className="btn btn-primary mt-1" style={{ fontSize: '10px' }} onClick={() => navigation(`/post/${post.id}`)}>
                  Read More
                </button>
                {isCurrentUserPost && (
                  <div className="mt-1" style={{ textAlign: 'right' }}>
                    <button className="btn btn-secondary" style={{ fontSize: '10px' }} onClick={() => handleEdit(post)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ fontSize: '10px' }} onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                )}

                <form onSubmit={(e) => handleComment(e, post)}>
                  <div className="form-group" style={{ textAlign: 'right' }}>
                    <label htmlFor="body"></label>
                    <input
                      className="form-control"
                      type="text"
                      id="comment"
                      placeholder="Add a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary mt-1" style={{ marginLeft: '2px', fontSize: '10px' }} type="submit">
                      Add Comment
                    </button>
                  </div>
                </form>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PostsPage;