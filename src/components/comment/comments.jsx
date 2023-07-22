import React, { useState } from "react";
import Comment from "./comment";
import { debounce } from "./utils";
import "./comment.css"

export default function Comments() {
  let [commentInput, setCommentInput] = useState("");
  let [comments, setComments] = useState([
    {
      id: 1,
      display: "I love this book",
      children: [
        {
          id: 2,
          display: "This is great",
          children: []
        },
        {
          id: 3,
          display: "okay",
          children: []
        }
      ]
    }
  ]);

  function addReply(commentId, replyText) {
    let commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }

  function newComment(text) {
    return {
      id: new Date().getTime(),
      display: text,
      children: []
    };
  }

  function insertComment(comments, parentId, text) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertComment(comment.children, parentId, text);
    }
  }

  return (
    <>
      <div>
        <div className="comment-input-box">
          <textarea
            placeholder="Comment about our book here"
            className='fw-6'
            rows="4"
            cols="50"
            value={commentInput}
            onChange={(e) => {
              debounce(setCommentInput(e.target.value));
            }}
          />
          <br />
          <button
            onClick={() => {
              setComments([newComment(commentInput), ...comments]);
              setCommentInput("");
            }}
          >
            comment
          </button>
        </div>
        <div >
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} addReply={addReply} />
          ))}
        </div>
      </div>

    </>
  );
}