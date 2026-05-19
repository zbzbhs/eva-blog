// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="font-mono text-xs text-eva-red mb-6 tracking-widest">
        &gt; ACCESS: MAGI DATABASE // PERSONNEL FILE
      </div>

      <div className="border-2 border-eva-purple rounded-lg p-6 bg-eva-black">
        {/* Pilot ID Card */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-eva-red flex items-center justify-center bg-eva-red/10 shrink-0">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <div className="text-white text-lg font-bold font-mono">
              PILOT: [NAME]
            </div>
            <div className="text-eva-purple text-xs font-mono mt-1">
              CLEARANCE: LEVEL-5 | 初号机 适格者
            </div>
            <div className="text-eva-red text-xs font-mono mt-1">
              CHILDREN No.03
            </div>
          </div>
        </div>

        {/* Sync rate skill bars */}
        <div className="space-y-3 font-mono text-xs">
          {[
            { label: "初号机·界面", level: 90 },
            { label: "MAGI核心", level: 75 },
            { label: "傀儡系统", level: 60 },
            { label: "圣枪·Rust", level: 50 },
          ].map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-text-muted mb-1">
                <span>{skill.label}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-2 bg-eva-black rounded-full overflow-hidden border border-eva-purple">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${skill.level}%`,
                    background:
                      skill.level > 80
                        ? "var(--eva-red)"
                        : skill.level > 60
                        ? "var(--eva-purple)"
                        : "#666666",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Contact commands */}
        <div className="mt-6 pt-4 border-t border-eva-purple font-mono text-xs space-y-1">
          <div className="text-text-muted">
            &gt; COMM: GITHUB <span className="text-eva-red">[link]</span>
          </div>
          <div className="text-text-muted">
            &gt; COMM: EMAIL <span className="text-eva-red">[link]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
