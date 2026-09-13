"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="main-nav">
      <div className="brand-header" style={{ marginBottom: 0 }}>
        <Link href="/post-requirement" style={{ textDecoration: "none" }}>
          <div className="brand">
            <span className="brand-dot" />
            GoPratle
          </div>
        </Link>
      </div>

      <div className="nav-links">
        <Link
          href="/post-requirement"
          className={`nav-link ${pathname === "/post-requirement" ? "active" : ""}`}
        >
          <span>✍️</span> Post Requirement
        </Link>
        <Link
          href="/events"
          className={`nav-link ${pathname === "/events" ? "active" : ""}`}
        >
          <span>📊</span> Explore Events
        </Link>
      </div>

      <div className="db-status-badge">
        <span className="db-pulse" />
        MongoDB Atlas Connected
      </div>
    </header>
  );
}
