import Link from "next/link";
import MapWrapper from "../../components/MapWrapper.jsx";
import Navbar from "../../components/Navbar";

export default function Appointment() {
  return (
    <div className="page">
      <Navbar />

      <main className="main">
        <div className="breadcrumb">
          <Link href="/appointment">Appointment</Link>
        </div>

        <h1 className="page-title">Appointment Walkthrough</h1>
        <p className="page-subtitle">Basic map demo below:</p>
        <MapWrapper />
      </main>
    </div>
  );
}