import Navbar from "../../components/Navbar.jsx";
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
          <ul className="step-bullets">
            {[
              "You usually need health insurance to help pay for care.",
              "Different situations call for different forms of care.",
              "The cost also depends on which palce you go and what insurance you have.",
              "In Washington, you may qualify for low-cost or even free insurance.",
            ].map((b) => (
              <li key={b} className="step-bullet">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="step-nav">
          <button className="btn-back" disabled>Back</button>
          <Link href="/decision-tree" className="btn-next">Next</Link>
        </div>
      </main>
    </div>
  );
}
