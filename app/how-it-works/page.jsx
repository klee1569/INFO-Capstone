"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

const steps = [
  {
    title: "The U.S. Healthcare System",
    intro: "Healthcare in the U.S. works differently than in most other countries. Knowing how it's set up helps you find the right care without overpaying.",
    bullets: [
      "You'll almost always need health insurance to help cover costs.",
      "There are different places to get care, and each one fits different situations.",
      "What you pay depends on where you go and what insurance you have.",
      "If you live in Washington State, you may qualify for free or low-cost insurance.",
    ],
    cards: [
      { label: "Primary Care", cost: "Low Cost", badge: "badge-green" },
      { label: "Urgent Care", cost: "Medium Cost", badge: "badge-orange" },
      { label: "Emergency Room", cost: "High Cost", badge: "badge-red" },
    ],
  },
  {
    title: "Your First Stop: Get Insurance",
    intro: "Without insurance, healthcare in the U.S. can be extremely expensive. Most people get coverage through their job, a government program, or by buying a plan themselves. Common options include:",
    bullets: [
      "Medicaid: free or low-cost coverage for people with lower income",
      "Medicare: for people 65 and older",
      "CHIP: free or low-cost coverage for children",
    ],
    cards: [],
  },
  {
    title: "Find a Primary Care Provider (PCP)",
    intro: "Once you have insurance, your next step is finding a primary care doctor. This is the person you'll see for regular checkups and everyday health concerns. Always confirm they accept your insurance before booking, as seeing an out-of-network doctor can cost significantly more. Building an ongoing relationship with a PCP also means better care over time, since they'll know your health history.",
    bullets: [],
    cards: [],
  },
  {
    title: "Know Where to Go for Care",
    intro: "Going to the right place saves you time and money. Here's a simple breakdown:",
    bullets: [
      "Regular illness or checkup: see your primary care doctor",
      "Urgent but not life-threatening (high fever, broken bone): go to an urgent care clinic",
      "Emergency (chest pain, serious injury): go to the emergency room (ER)",
    ],
    cards: [],
    outro: "Keep your insurance card with you, and always check that a doctor's office accepts your plan before your visit.",
  },
];

export default function HowItWorks() {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const progress = Math.round(((current + 1) / steps.length) * 100);

  return (
    <div className="page">
      <Navbar />
      <main className="main-wide">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">How U.S. Healthcare Works:</h1>
        <p className="page-subtitle">Follow these steps to understand the system.</p>

        <div className="progress-row">
          <span>Step {current + 1} of {steps.length}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-dots" style={{ marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div key={i} className={`progress-dot${i <= current ? " done" : ""}`} />
          ))}
        </div>

        <div className="step-card">
          <div className="step-card-header">
            <h2 className="step-card-title">{step.title}</h2>
          </div>
          <div className="step-card-body">
            <p className="step-intro">{step.intro}</p>

            {step.bullets.length > 0 && (
              <ul className="step-bullets">
                {step.bullets.map((b) => (
                  <li key={b} className="step-bullet">{b}</li>
                ))}
              </ul>
            )}

            {step.outro && (
              <p className="step-intro" style={{ marginTop: 16 }}>{step.outro}</p>
            )}

            {step.cards.length > 0 && (
              <div className="care-cards">
                {step.cards.map((card) => (
                  <div key={card.label} className="care-card">
                    <span className="care-card-label">{card.label}</span>
                    <span className={`badge ${card.badge}`}>{card.cost}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="step-nav">
          {current === 0 ? (
            <button className="btn-back" disabled>Back</button>
          ) : (
            <button className="btn-back" style={{ color: "var(--gray-700)", cursor: "pointer" }} onClick={() => setCurrent(current - 1)}>
              &lsaquo; Back
            </button>
          )}

          {current < steps.length - 1 ? (
            <button className="btn-next" onClick={() => setCurrent(current + 1)}>
              Next &rsaquo;
            </button>
          ) : (
            <Link href="/decision-tree" className="btn-next" style={{ background: "var(--green-text)" }}>
              Done ✓
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
