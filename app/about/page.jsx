import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

export default function About() {
  return (
    <div className="page">
      <Navbar />

      <main className="main-wide">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>

        <div className="step-card">
          <div className="step-card-header">
            <h2 className="step-card-title">About Wellkare</h2>
          </div>
          <div className="step-card-body">
            <p className="step-intro">WellKare is a healthcare-focused capstone project designed to improve the way patients access and manage their care through a user-friendly digital platform that provides valuable information, easily accessible. Our goal is to simplify common healthcare tasks such as the process of scheduling appointments, organizing health information, and improving communication. We aim to create a convenient, accessible, and efficient solution that helps users stay educated and engaged with their health while reducing friction in everyday healthcare interactions.</p>

            <h3>Our Team</h3>
            <p className="step-intro">Team name: SEACK. We are all senior informatics students at the University of Washington, passionate about designing accessible solutions that serve the community positively.</p>
          </div>
        </div>
      </main>
    </div>
  );
}