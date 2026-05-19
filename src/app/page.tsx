// src/app/page.tsx
import { getAllPosts } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import Link from "next/link";
import { HomeClient } from "./home-client";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="relative min-h-[calc(100vh-6rem)]">
      <HomeClient />

      <div className="relative z-10 pt-8">
        <div className="font-mono text-xs text-eva-red mb-4 tracking-widest">
          [SYS] MAGI SYSTEM v3.0 // PILOT: ONLINE
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] text-white mb-1">
          NEON GENESIS
        </h1>
        <p className="text-eva-purple text-sm tracking-[0.3em] mb-8">
          EVANGELION DIGITAL ARCHIVE
        </p>

        <div className="flex gap-3 mb-8 font-mono text-xs">
          <Link href="/posts" className="bg-eva-red/15 border border-eva-red text-eva-red px-3 py-1.5 rounded hover:bg-eva-red/25 transition-colors">
            &gt; LATEST ARCHIVE
          </Link>
          <Link href="/about" className="bg-eva-purple/15 border border-eva-purple text-text-secondary px-3 py-1.5 rounded hover:bg-eva-purple/25 transition-colors">
            &gt; PILOT FILE
          </Link>
        </div>

        {/* Article feed */}
        <div className="border border-eva-purple rounded p-4 font-mono text-sm max-w-2xl">
          <div className="text-eva-red text-xs mb-3">
            &gt; RECENT ARCHIVES
          </div>
          {posts.length === 0 ? (
            <p className="text-text-muted text-xs">
              &gt; NO ARCHIVES FOUND. AWAITING FIRST ENTRY...
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex items-baseline gap-3 py-1.5 border-b border-eva-black hover:border-eva-red/30 transition-colors group"
                >
                  <span className="text-text-muted text-xs shrink-0">
                    {i === 0 ? (
                      <span className="text-eva-red">&gt; {String(i + 1).padStart(3, "0")}</span>
                    ) : (
                      <span className="text-text-muted">&gt; {String(i + 1).padStart(3, "0")}</span>
                    )}
                  </span>
                  <span className="text-text-secondary group-hover:text-eva-red transition-colors truncate">
                    {post.frontmatter.title}
                  </span>
                  <span className="text-text-muted text-xs hidden sm:inline shrink-0">
                    {post.frontmatter.tags.map((t) => getEvaTag(t)).join(" ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
