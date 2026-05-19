// src/components/mdx/components.tsx
import { ReactNode } from "react";

export function MDXH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-eva-red text-2xl font-bold border-b border-eva-purple pb-2 mb-4">
      {children}
    </h1>
  );
}

export function MDXH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-eva-red text-xl font-bold mt-8 mb-4">
      &gt; {children}
    </h2>
  );
}

export function MDXH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-eva-purple text-lg font-bold mt-6 mb-3">
      // {children}
    </h3>
  );
}

export function MDXPre({ children }: { children: ReactNode }) {
  return (
    <pre className="bg-eva-black border border-eva-purple p-4 rounded overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  );
}

export function MDXCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-eva-black text-eva-red px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  );
}

export function MDXBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-4 border-eva-red pl-4 my-4 text-text-secondary italic">
      {children}
    </blockquote>
  );
}

export function MDXA({ href, children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-eva-red hover:text-eva-purple underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  );
}

export function MDXHr() {
  return <hr className="border-eva-purple my-8" />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: any = {
  h1: MDXH1,
  h2: MDXH2,
  h3: MDXH3,
  pre: MDXPre,
  code: MDXCode,
  blockquote: MDXBlockquote,
  a: MDXA,
  hr: MDXHr,
};
