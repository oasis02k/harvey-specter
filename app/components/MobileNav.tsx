"use client";

import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden"
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect y="5" width="24" height="2" rx="1" fill="black" />
          <rect y="11" width="24" height="2" rx="1" fill="black" />
          <rect y="17" width="24" height="2" rx="1" fill="black" />
        </svg>
      </button>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col px-4 pt-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end mb-8"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <ul className="flex flex-col gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-semibold text-2xl tracking-[-0.04em] capitalize text-black"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <button className="mt-8 w-fit bg-black text-white font-medium text-sm tracking-[-0.04em] rounded-full px-4 py-3">
            Let&apos;s talk
          </button>
        </div>
      )}
    </>
  );
}
