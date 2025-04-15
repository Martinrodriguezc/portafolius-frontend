import { useState } from "react";

export function useVideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    console.log("Comment submitted:", comment);
    setComment("");
  };

  return { isPlaying, setIsPlaying, comment, setComment, handleSubmitComment };
}