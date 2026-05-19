// src/app/posts/page.tsx
import { getAllPosts } from "@/lib/posts";
import { PostsClient } from "./posts-client";

export default function PostsPage() {
  const posts = getAllPosts();
  return <PostsClient posts={posts} />;
}
