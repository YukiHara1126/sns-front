import React, { useEffect } from "react";
import { Post } from "./Post";
import apiClient from "@/lib/apiClient";
import { useState } from "react";
import { PostType } from "@/types";

export const TimeLine = () => {
  const [content, setContent] = useState("");
  const [latestPost, setLatestPost] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchLatestPost = async () => {
      const res = await apiClient.get("/posts/latest");
      setLatestPost(res.data.latestPost);
    };
    fetchLatestPost();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/posts/post", { content: content });
      console.log(res);
      setContent("");
      setLatestPost([res.data.newPost, ...latestPost]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              value={content}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPost.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};
