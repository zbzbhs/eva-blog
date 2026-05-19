// src/app/not-found.tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="font-mono text-eva-red text-6xl mb-4">404</div>
      <div className="font-mono text-sm text-eva-purple mb-2 tracking-widest">
        &gt; WARNING: PATTERN BLUE
      </div>
      <p className="font-mono text-text-muted text-sm mb-8 max-w-md">
        此路不通，使徒入侵。目标路径不存在于 MAGI 数据库中。
      </p>
      <Link
        href="/"
        className="font-mono text-sm text-eva-red border border-eva-red px-4 py-2 rounded hover:bg-eva-red/10 transition-colors"
      >
        &gt; RETURN TO NERV HQ
      </Link>
    </div>
  );
}
