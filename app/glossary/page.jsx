import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

export default function Glossary() {
  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">Healthcare Glossary</h1>
        <p className="page-subtitle">Plain-language definitions of common U.S. healthcare terms.</p>

        <input
          type="text"
          placeholder="Search a term..."
          className="search-input"
        />
      </main>
    </div>
  );
}
