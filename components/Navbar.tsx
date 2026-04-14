"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/decision-tree", label: "Decision Tree" },
  { href: "/glossary", label: "Glossary" },
  { href: "/appointment", label: "Appointment Walkthrough" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">W</div>
          <div>
            <div className="navbar-brand-text">WellKare</div>
            <div className="navbar-brand-sub">Your guide to U.S. healthcare</div>
          </div>
        </Link>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link${pathname.startsWith(link.href) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <button className="navbar-lang">ES</button>
        </div>
      </div>
    </nav>
  );
}
