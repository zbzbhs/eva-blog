// src/app/links/page.tsx
export default function LinksPage() {
  const links: Array<{ id: string; name: string; url: string; desc: string }> = [];

  return (
    <div className="max-w-lg mx-auto">
      <div className="font-mono text-xs text-eva-red mb-6 tracking-widest">
        &gt; COMM_LINKS: ALLIED_STATIONS
      </div>

      {links.length === 0 ? (
        <div className="border border-eva-purple rounded p-6 font-mono text-sm text-text-muted">
          &gt; NO ALLIED STATIONS DETECTED. AWAITING DIPLOMATIC CHANNELS...
        </div>
      ) : (
        <div className="border border-eva-purple rounded divide-y divide-eva-bg font-mono text-sm">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-4 py-3 hover:bg-eva-red/5 transition-colors"
            >
              <span className="text-eva-red">&gt; [{link.id}]</span>
              <span className="text-text-secondary">{link.name}</span>
              <span className="text-text-muted text-xs ml-auto">{link.desc}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
