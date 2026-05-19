// src/components/mdx/mdx-renderer.tsx
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "./components";

interface Props {
  source: MDXRemoteSerializeResult;
}

export function MDXRenderer({ source }: Props) {
  return (
    <div className="prose-invert max-w-none leading-relaxed">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}
