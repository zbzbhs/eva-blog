// src/app/tags/[tag]/page.tsx
import { getPostsByTag, getAllPosts } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => tagSet.add(t)));
  return [...tagSet].map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-mono text-xs text-eva-red mb-4 tracking-widest">
        &gt; QUERY: TAG_FILTER = &quot;{getEvaTag(params.tag)}&quot;
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-text-muted">
          &gt; QUERY RETURNED 0 RESULTS FOR TAG: {getEvaTag(params.tag)}
        </p>
      ) : (
        <div className="border border-eva-purple rounded divide-y divide-eva-bg font-mono text-sm">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex items-center gap-4 px-4 py-3 hover:bg-eva-red/5 transition-colors"
            >
              <span className="text-eva-purple text-xs">{post.frontmatter.date}</span>
              <span className="text-text-secondary hover:text-eva-red flex-1">
                {post.frontmatter.title}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="font-mono text-xs text-eva-red mt-4">
        &gt; {posts.length} RECORDS FOUND. <span className="cursor-blink">▊</span>
      </div>

      <div className="mt-8 font-mono text-sm">
        <Link href="/tags" className="text-eva-red hover:text-eva-purple">
          &gt; BACK TO TAG_MATRIX
        </Link>
      </div>
    </div>
  );
}
