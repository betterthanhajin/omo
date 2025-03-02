import React, { useState } from "react";
import { motion } from "framer-motion";

interface PostData {
  id: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
}

const PostIt = ({
  id,
  content,
  updateContent,
}: {
  id: string;
  content: string;
  updateContent: (id: string, newContent: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);

  const handleClick = () => {
    setIsEditing(true);
    setText("");
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateContent(id, text);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-48 bg-yellow-300 p-4 m-2 shadow-md rounded-sm cursor-move transform rotate-1 mt-14"
        style={{
          boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)",
        }}
        onClick={handleClick}
      >
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            className="w-full h-full bg-transparent resize-none focus:outline-none font-handwriting text-gray-800"
            style={{
              lineHeight: "1.5",
              fontSize: "14px",
            }}
            autoFocus
          />
        ) : (
          <p
            className="font-handwriting text-gray-800"
            style={{
              lineHeight: "1.5",
              fontSize: "14px",
            }}
          >
            {content}
          </p>
        )}
      </motion.div>
    </>
  );
};

const PostItBoard = () => {
  const [postIts, setPostIts] = useState([
    { id: "postit-1", content: "첫 번째 메모" },
    { id: "postit-2", content: "두 번째 메모" },
    { id: "postit-3", content: "세 번째 메모" },
    { id: "postit-4", content: "네 번째 메모" },
    { id: "postit-5", content: "다섯번째 메모" },
    { id: "postit-6", content: "여섯번째 메모" },
    { id: "postit-7", content: "일곱번째 메모" },
    { id: "postit-8", content: "여덟번째 메모" },
  ]);

  const [post, setPost] = useState<PostData[]>([]);
  const updateContent = (id: string, newContent: string) => {
    setPostIts(
      postIts.map((postIt) =>
        postIt.id === id ? { ...postIt, content: newContent } : postIt
      )
    );
  };

  return (
    <div className="grid grid-cols lg:grid-cols-4 sm:grid-cols-2 gap-4 p-4">
      {postIts.map((postIt) => (
        <PostIt
          key={postIt.id}
          id={postIt.id}
          content={postIt.content}
          updateContent={updateContent}
        />
      ))}
    </div>
  );
};

export default PostItBoard;
