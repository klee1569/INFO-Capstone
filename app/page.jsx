import Navbar from "../components/Navbar.jsx";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      <section className="home-hero">
        <h1 className="home-title">
          Health Care in the U.S.<br />explained simply
        </h1>
        <Link href="/how-it-works" className="home-start-btn">Start here</Link>
      </section>

      <section style={{ maxWidth: 560, margin: "0 auto", paddingBottom: 64 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <Link href="/how-it-works" className="home-card highlighted">
            <p className="home-card-title">How Health care in the U.S works</p>
            <p className="home-card-sub">A simple guide for understanding health care system in the U.S</p>
          </Link>
          <Link href="/how-it-works" className="home-card">
            <p className="home-card-title">Insurance Walk through</p>
          </Link>
          <Link href="/glossary" className="home-card">
            <p className="home-card-title">Health Glossary</p>
          </Link>
        </div>
      </section>

      <Link href="/about" className="about-btn">About</Link>
    </div>
  );
}
