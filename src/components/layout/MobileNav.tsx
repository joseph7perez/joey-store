"use client";

import Link from "next/link";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { NAV_LINKS, SOCIAL_LINKS } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        className="-mr-2 grid size-11 place-items-center rounded-full text-cacao transition-colors hover:bg-cacao/8 md:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
          <path d="M4 8h16M9 16h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} side="right" label="Menú">
        <div className="flex items-center justify-between px-6 pt-5">
          <p className="font-display text-2xl">Menú</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="grid size-11 place-items-center rounded-full hover:bg-cacao/8"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Principal" className="mt-6 px-6">
          <ul className="flex flex-col">
            {[{ href: "/productos", label: "Tienda" }, ...NAV_LINKS].map((link) => (
              <li key={link.href} className="border-b border-dashed border-line">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-[1.65rem] leading-tight"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto px-6 pb-8 text-sm text-cacao-soft">
          {SOCIAL_LINKS.map((social) => (
            <a key={social.id} href={social.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              {social.label} {social.handle}
            </a>
          ))}
        </div>
      </Drawer>
    </>
  );
}
