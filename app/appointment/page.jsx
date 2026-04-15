import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

export default function Appointment() {
  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">Appointment Walkthrough</h1>
        <p className="page-subtitle">This section is coming soon.</p>
      </main>
    </div>
  );
}
