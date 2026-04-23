"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

const scenarios = [
  {
    id: "no-insurance",
    title: "I am sick and don't have insurance",
    subtitle: "Find low-cost or free care options in Seattle.",
    steps: [
      {
        question: "How urgent is your situation?",
        options: [
          {
            label: "Not an emergency, I can wait",
            next: 1,
          },
          {
            label: "It feels like an emergency",
            result: "Go to the nearest Emergency Room. Call 911 if needed.",
          },
        ],
      },
      {
        question: "Do you have a regular income?",
        options: [
          {
            label: "Yes",
            result: "Visit a Community Health Center. They charge based on your income. Find one at findahealthcenter.hrsa.gov.",
          },
          {
            label: "No or very little",
            result: "You likely qualify for Medicaid (Apple Health in WA). Apply at wahealthplanfinder.org.",
          },
        ],
      },
    ],
  },
  {
    id: "has-insurance",
    title: "I have insurance but don't understand it",
    subtitle: "Learn how to use your insurance the right way.",
    steps: [
      {
        question: "What do you need help with?",
        options: [
          {
            label: "I don't know what my plan covers",
            next: 1,
          },
          {
            label: "I got a bill I don't understand",
            result: "Call the number on your insurance card and ask for an Explanation of Benefits (EOB). You have the right to dispute charges.",
          },
        ],
      },
      {
        question: "Do you have a primary care doctor?",
        options: [
          {
            label: "Yes",
            result: "Call your primary care doctor first. Always check that a provider is in-network before your visit to avoid surprise costs.",
          },
          {
            label: "No",
            result: "Use your insurance company's website to find an in-network primary care doctor near you.",
          },
        ],
      },
    ],
  },
  {
    id: "child-care",
    title: "I need care for my child",
    subtitle: "Get the right care for your child quickly and safely.",
    steps: [
      {
        question: "How serious is your child's situation?",
        options: [
          {
            label: "Minor illness or routine checkup",
            next: 1,
          },
          {
            label: "Serious injury or breathing problems",
            result: "Go to a Pediatric Emergency Room or call 911. Seattle Children's Hospital has 24/7 emergency care.",
          },
        ],
      },
      {
        question: "Does your child have insurance?",
        options: [
          {
            label: "Yes",
            result: "See your child's pediatrician. Avoid the ER for non-emergencies — it costs significantly more.",
          },
          {
            label: "No",
            result: "Children under 19 in Washington often qualify for Apple Health at no cost, depending on your income. Apply at wahealthplanfinder.org.",
          },
        ],
      },
    ],
  },
  {
    id: "no-insurance-yet",
    title: "I don't have insurance yet",
    subtitle: "Get help understanding or finding coverage.",
    steps: [
      {
        question: "What would you like to do?",
        options: [
          {
            label: "I need to understand the insurance system",
            result: "Head to the How It Works section for a step-by-step walkthrough of the U.S. healthcare system, or check the Glossary for definitions of common terms.",
            links: [
              { label: "Go to walkthrough", href: "/how-it-works" },
              { label: "Go to glossary", href: "/glossary" },
            ],
          },
          {
            label: "I need help getting insurance",
            next: 1,
          },
        ],
      },
      {
        question: "How would you like to get help?",
        options: [
          {
            label: "I want to speak with a representative",
            result: "Call the Washington Healthplanfinder support line at 1-855-923-4633. They can walk you through your options and help you enroll.",
          },
          {
            label: "Direct me to the walkthrough and glossary",
            result: "The How It Works section covers the insurance system step by step. The Glossary explains terms like premium, deductible, and copay.",
            links: [
              { label: "Go to walkthrough", href: "/how-it-works" },
              { label: "Go to glossary", href: "/glossary" },
            ],
          },
        ],
      },
    ],
  },
];

export default function DecisionTree() {
  const [activeId, setActiveId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState(null);

  const scenario = scenarios.find((s) => s.id === activeId);

  const reset = () => {
    setActiveId(null);
    setStepIndex(0);
    setResult(null);
  };

  const handleOption = (option) => {
    if (option.result !== undefined) {
      setResult({ text: option.result, links: option.links || [] });
    } else if (option.next !== undefined) {
      setStepIndex(option.next);
    }
  };

  if (result) {
    return (
      <div className="page">
        <Navbar />
        <main className="main">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
          </div>
          <h1 className="page-title">Decision Tree: I Need Care</h1>
          <p className="page-subtitle">Choose your situation to get personalized guidance on the right care for you.</p>
          <div className="step-card">
            <div className="step-card-header">
              <h2 className="step-card-title">Here's what we recommend</h2>
            </div>
            <div className="step-card-body">
              <p className="step-intro">{result.text}</p>
              {result.links.length > 0 && (
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  {result.links.map((l) => (
                    <Link key={l.href} href={l.href} className="btn-next" style={{ textDecoration: "none" }}>{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="step-nav">
            <button className="btn-back" style={{ color: "var(--gray-700)", cursor: "pointer" }} onClick={() => setResult(null)}>
              &lsaquo; Back
            </button>
            <button className="btn-back" style={{ color: "var(--gray-700)", cursor: "pointer" }} onClick={reset}>
              Start over &rsaquo;
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (scenario) {
    const current = scenario.steps[stepIndex];
    const totalSteps = scenario.steps.length;
    return (
      <div className="page">
        <Navbar />
        <main className="main">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={reset}>Decision Tree</span>
          </div>
          <h1 className="page-title">Decision Tree: I Need Care</h1>
          <p className="page-subtitle">{scenario.title}</p>

          <div className="progress-row">
            <span>Step {stepIndex + 1} of {totalSteps}</span>
          </div>
          <div className="progress-track" style={{ marginBottom: 24 }}>
            <div className="progress-fill" style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }} />
          </div>

          <div className="step-card">
            <div className="step-card-header">
              <h2 className="step-card-title">{current.question}</h2>
            </div>
            <div className="step-card-body">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {current.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleOption(opt)}
                    className="flow-option"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="step-nav">
            {stepIndex === 0 ? (
              <button className="btn-back" style={{ color: "var(--gray-700)", cursor: "pointer" }} onClick={reset}>
                &lsaquo; Back to scenarios
              </button>
            ) : (
              <button className="btn-back" style={{ color: "var(--gray-700)", cursor: "pointer" }} onClick={() => setStepIndex(stepIndex - 1)}>
                &lsaquo; Back
              </button>
            )}
            <button className="btn-back" style={{ color: "var(--gray-700)", cursor: "pointer" }} onClick={reset}>
              Start over &rsaquo;
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">Decision Tree: I Need Care</h1>
        <p className="page-subtitle">Choose your situation to get personalized guidance on the right care for you.</p>

        <div className="tip-box">
          Answer a few simple questions and we'll guide you to the right care option for your situation.
        </div>

        <div className="scenario-list">
          {scenarios.map((s) => (
            <button key={s.id} className="scenario-card" onClick={() => { setActiveId(s.id); setStepIndex(0); setResult(null); }}>
              <div>
                <div className="scenario-title">{s.title}</div>
                <div className="scenario-sub">{s.subtitle}</div>
                <div className="scenario-dots">
                  <div className="dot dot-primary" />
                  <div className="dot dot-light" />
                  <span className="scenario-count">{s.steps.length} questions</span>
                </div>
              </div>
              <span className="scenario-arrow">›</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}