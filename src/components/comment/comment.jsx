import React, { useState, useRef } from "react";

export default function Comment({ comment, addReply }) {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const inputEl = useRef(null);

  return (
    <div className="commentContainer">
      {comment.display}
      {!showReplyBox && (
        <button
          className="flex flex-col"
          type="button"
          onClick={() => {
            setShowReplyBox(true);
            setTimeout(() => inputEl.current.focus());
          }}
        >
          reply
        </button>
      )}
      {showReplyBox && (
        <>
          <br />
          <textarea
            ref={inputEl}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
            type="text"
          />
          <br />
          <div>
            <button
              type="button"
              onClick={() => {
                addReply(comment.id, replyText);
                setShowReplyBox(false);
                setReplyText("");
              }}
            >
              save
            </button>
            |
            <button
              type="button"
              onClick={() => {
                setShowReplyBox(false);
                setReplyText("");
              }}
            >
              cancel
            </button>
          </div>
        </>
      )}
      {comment.children.length > 0 && (
        <div>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              addReply={addReply}
            />
          ))}
        </div>
      )
      }
    </div >
  );
}