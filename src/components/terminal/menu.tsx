// src/components/terminal/menu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { num: "01", label: "ROOT_ARCHIVE", href: "/" },
  { num: "02", label: "MAGI_QUERY", href: "/posts" },
  { num: "03", label: "TAG_MATRIX", href: "/tags" },
  { num: "04", label: "PILOT_FILE", href: "/about" },
  { num: "05", label: "COMM_LINKS", href: "/links" },
];

export function SystemMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 border-r border-eva-purple bg-eva-black z-50 p-4">
        <Link href="/" className="text-eva-red text-lg font-bold tracking-widest mb-8">
          NERV
        </Link>
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.num}
                href={item.href}
                className={`font-mono text-sm py-2 px-3 rounded transition-colors ${
                  isActive
                    ? "text-eva-red bg-eva-red/10 border-l-2 border-eva-red"
                    : "text-text-secondary hover:text-eva-red hover:bg-eva-bg"
                }`}
              >
                &gt; [{item.num}] {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile: hamburger + overlay */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 right-4 z-50 text-eva-red font-mono text-sm bg-eva-black border border-eva-purple px-3 py-1 rounded"
        >
          {open ? "[X] CLOSE" : "[≡] MENU"}
        </button>
        {open && (
          <div className="fixed inset-0 bg-eva-black z-40 flex flex-col justify-center items-center gap-4">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-lg ${
                    isActive ? "text-eva-red" : "text-text-secondary"
                  }`}
                >
                  &gt; [{item.num}] {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
