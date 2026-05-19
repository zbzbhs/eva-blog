// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MagiBranch } from "./theme";

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  branch: MagiBranch;
  excerpt?: string;
  cover?: string;
  updated?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  excerpt: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  const filenames = fs.readdirSync(postsDir);
  const posts = filenames
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontmatter: PostFrontmatter = {
        title: data.title ?? slug,
        date: data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : (data.date ?? "1970-01-01"),
        tags: data.tags ?? [],
        branch: data.branch ?? "BALTHASAR",
        excerpt: data.excerpt,
        cover: data.cover,
        updated: data.updated instanceof Date
          ? data.updated.toISOString().slice(0, 10)
          : data.updated,
      };

      const excerpt =
        frontmatter.excerpt ??
        content.replace(/[#*`\[\]()\!\->]/g, "").slice(0, 150).trim();

      return { slug, frontmatter, content, excerpt };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}
