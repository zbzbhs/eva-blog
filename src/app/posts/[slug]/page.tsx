// src/app/posts/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getEvaTag, magiBranches } from "@/lib/theme";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXH1, MDXH2, MDXH3, MDXPre, MDXCode, MDXBlockquote, MDXA, MDXHr } from "@/components/mdx/components";

const components = {
  h1: MDXH1,
  h2: MDXH2,
  h3: MDXH3,
  pre: MDXPre,
  code: MDXCode,
  blockquote: MDXBlockquote,
  a: MDXA,
  hr: MDXHr,
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const mdxSource = await serialize(post.content);

  return (
    <article className="max-w-3xl mx-auto">
      {/* NERV Archive Header */}
      <div className="border border-eva-purple rounded p-4 mb-8 font-mono text-xs">
        <div className="text-eva-red">
          &gt; MAGI_ARCHIVE_ID: NERV-{post.frontmatter.date.replace(/-/g, "")}-{post.slug.slice(0, 8).toUpperCase()}
        </div>
        <div className="text-eva-purple">
          &gt; CLEARANCE: LEVEL-3
        </div>
        <div className="text-text-muted">
          &gt; TIMESTAMP: {post.frontmatter.date} 14:30:00 JST
        </div>
        <div className="text-text-secondary">
          &gt; SUBJECT: {post.frontmatter.title}
        </div>
        <div className="text-eva-purple">
          &gt; BRANCH: {post.frontmatter.branch} ({magiBranches[post.frontmatter.branch]})
        </div>
        <div className="text-text-muted mt-2 flex gap-2">
          &gt; TAGS:{" "}
          {post.frontmatter.tags.map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className="text-eva-red hover:text-eva-purple"
            >
              [{getEvaTag(t)}]
            </Link>
          ))}
        </div>
      </div>

      {/* Article title */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {post.frontmatter.title}
      </h1>

      {/* MDX Content */}
      <div className="prose-invert max-w-none leading-relaxed">
        <MDXRemote source={mdxSource} components={components as any} />
      </div>

      {/* Back link */}
      <div className="mt-12 pt-4 border-t border-eva-purple font-mono text-sm">
        <Link href="/posts" className="text-eva-red hover:text-eva-purple">
          &gt; BACK TO ARCHIVE
        </Link>
      </div>
    </article>
  );
}
