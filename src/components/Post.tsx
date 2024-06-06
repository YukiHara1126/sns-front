import { PostType } from "@/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: PostType;
};

export const Post = ({ post }: Props) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post?.auther?.id}`}>
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src={post?.auther?.profile?.profileImageUrl}
              alt="プロフィール"
              width={40}
              height={40}
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post?.auther?.username}</h2>
            <p className="text-gray-500 text-sm">
              {post?.createdAt.toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post?.content}</p>
      </div>
    </div>
  );
};
