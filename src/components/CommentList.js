// src/components/CommentList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = () => {
  // State variables
  const [comments, setComments] = useState([]);
  const [postIdFilter, setPostIdFilter] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch comments from the API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments") // Include _limit=100
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handle filter input change
  const handleFilterChange = (event) => {
    setPostIdFilter(event.target.value);
  };

  // Handle post selection
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="comment-list">
      <div className="left-side">
      <input
        type="text"
        placeholder="Filter by Post ID"
        value={postIdFilter}
        onChange={handleFilterChange}
      />
        {comments
          .filter((comment) =>
            comment.postId.toString().includes(postIdFilter)
          )
          .map((comment) => (
            <div
              key={comment.id}
              className={`post ${
                selectedPost && selectedPost.id === comment.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => handlePostClick(comment)}
            >
              {comment.body}
            </div>
          ))}
      </div>
      

      {/* Right side: Display selected post and its comments */}
      <div className="right-side">
        {selectedPost && (
          <div className="selected-post">
            <h2>Selected Post</h2>
            <div>{selectedPost.body}</div>
          </div>
        )}

        {selectedPost &&
          comments
            .filter((comment) => comment.postId === selectedPost.postId)
            .map((comment) => (
              <div key={comment.id} className="comment">
                {comment.body}
              </div>
            ))}
      </div>
    </div>
  );
};

export default CommentList;
