// src/app/tags/page.tsx
import { getAllTags } from "@/lib/posts";
import { getEvaTag } from "@/lib/theme";
import Link from "next/link";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="font-mono text-xs text-eva-red mb-6 tracking-widest">
        &gt; TAG_MATRIX: CLASSIFIED_INDEX
      </div>

      {/* EVA terminology mapping reference */}
      <div className="border border-eva-purple rounded p-4 mb-8 font-mono text-xs">
        <div className="text-eva-red mb-2">&gt; TERMINOLOGY_MAPPING:</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-text-muted">
          <span>frontend → 初号机·界面</span>
          <span>backend → MAGI核心</span>
          <span>ai/ml → 傀儡系统</span>
          <span>devops → NERV总部</span>
          <span>design → 橙色图案</span>
          <span>tutorial → 训练模拟</span>
          <span>rust → 圣枪·Rust</span>
          <span>thoughts → LCL之海</span>
          <span>animation → AT力场</span>
          <span>performance → 暴走模式</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="font-mono text-sm border border-eva-purple rounded px-4 py-3 hover:border-eva-red hover:bg-eva-red/5 transition-colors group"
          >
            <span className="text-text-secondary group-hover:text-eva-red">
              {getEvaTag(tag)}
            </span>
            <span className="text-text-muted ml-2">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
