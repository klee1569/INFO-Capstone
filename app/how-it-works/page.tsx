import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="page">
      <Navbar />
      <main className="main-wide">
        <h1 className="page-title">How U.S. Healthcare Works</h1>
        <p className="page-subtitle">Follow these steps to understand the healthcare system.</p>

        <div className="progress-row">
          <span>Step 1 of 4</span>
          <span>25%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" />
        </div>
        <div className="progress-dots">
          <div className="progress-dot done" />
          <div className="progress-dot" />
          <div className="progress-dot" />
          <div className="progress-dot" />
        </div>

        <div className="step-card">
          <div className="step-card-header">
            <h2 className="step-card-title">The U.S. Healthcare System</h2>
          </div>
          <div className="step-card-body">
            <p className="step-intro">
              Healthcare in the U.S. works differently than in many other countries. Understanding how it is organized helps you get the right care at the right cost.
            </p>
          </div>
        </div>

        <div className="step-nav">
          <button className="btn-back" disabled>Back</button>
          <Link href="/decision-tree" className="btn-next">Next</Link>
        </div>
      </main>
    </div>
  );
}
