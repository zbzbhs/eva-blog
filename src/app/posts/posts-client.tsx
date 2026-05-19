// src/app/posts/posts-client.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import { SearchBox } from "@/components/search/search-box";
import Fuse from "fuse.js";

interface Props {
  posts: Post[];
}

export function PostsClient({ posts: allPosts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allPosts.forEach((p) => p.frontmatter.tags.forEach((t) => tagSet.add(t)));
    return [...tagSet].sort();
  }, [allPosts]);

  const fuse = useMemo(
    () =>
      new Fuse(allPosts, {
        keys: ["frontmatter.title", "frontmatter.excerpt", "content"],
        threshold: 0.3,
      }),
    [allPosts]
  );

  const filtered = useMemo(() => {
    let result = allPosts;

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (activeTag) {
      result = result.filter((p) => p.frontmatter.tags.includes(activeTag));
    }

    return result;
  }, [allPosts, searchQuery, activeTag, fuse]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="font-mono text-xs text-eva-red mb-2 tracking-widest">
        &gt; QUERY: ALL_ARCHIVES | SORT: DATE_DESC
      </div>

      <SearchBox onSearch={setSearchQuery} />

      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTag(null)}
          className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
            activeTag === null
              ? "bg-eva-red text-white border-eva-red"
              : "bg-eva-black text-text-muted border-eva-purple hover:text-eva-red"
          }`}
        >
          ALL
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
              tag === activeTag
                ? "bg-eva-red text-white border-eva-red"
                : "bg-eva-black text-text-muted border-eva-purple hover:text-eva-red"
            }`}
          >
            {getEvaTag(tag)}
          </button>
        ))}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="font-mono text-sm text-text-muted py-8">
          {searchQuery
            ? "&gt; SEARCH: NO MATCHING DOCUMENTS"
            : activeTag
            ? `&gt; QUERY RETURNED 0 RESULTS FOR TAG: ${getEvaTag(activeTag)}`
            : "&gt; NO ARCHIVES FOUND. AWAITING FIRST ENTRY..."}
        </div>
      ) : (
        <div className="border border-eva-purple rounded divide-y divide-eva-bg font-mono text-sm">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 px-4 py-3 hover:bg-eva-red/5 transition-colors group"
            >
              <span className="text-eva-purple text-xs shrink-0">
                {post.frontmatter.date}
              </span>
              <span className="text-text-secondary group-hover:text-eva-red transition-colors flex-1">
                {post.frontmatter.title}
              </span>
              <span className="text-text-muted text-xs flex gap-2 shrink-0">
                {post.frontmatter.tags.map((t) => (
                  <span key={t}>{getEvaTag(t)}</span>
                ))}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination footer */}
      <div className="font-mono text-xs text-eva-red mt-4">
        &gt; {filtered.length} RECORDS FOUND.{" "}
        <span className="cursor-blink">▊</span>
      </div>
    </div>
  );
}
