"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

const terms = [
  {
    letter: "C",
    term: "Copay",
    definition: "A fixed amount you pay each time you receive a specific type of care, like a doctor visit or prescription. For example, your plan might charge a $20 copay every time you see your primary care doctor.",
  },
  {
    letter: "D",
    term: "Deductible",
    definition: "The amount you pay out of pocket for covered services before your insurance starts contributing. If your deductible is $1,000, you cover the first $1,000 of care each year yourself. After that, your insurance begins sharing the cost.",
  },
  {
    letter: "I",
    term: "In-Network",
    definition: "Doctors, hospitals, and clinics that have an agreement with your insurance company to provide care at a lower rate. Seeing an in-network provider almost always costs less than going out-of-network. Always check before your visit.",
  },
  {
    letter: "P",
    term: "Premium",
    definition: "The fixed amount you pay each month to keep your health insurance active, regardless of whether you use any medical services that month. Think of it as a subscription fee for your coverage.",
  },
  {
    letter: "P",
    term: "Primary Care Provider (PCP)",
    definition: "Your main doctor for routine care, checkups, and everyday health concerns. Your PCP is usually your first call when something feels off, and they can refer you to specialists when needed. Building a relationship with a PCP leads to better long-term care.",
  },
];

export default function Glossary() {
  const [openTerms, setOpenTerms] = useState(new Set());

  const toggleTerm = (term) => {
    setOpenTerms((prev) => {
      const next = new Set(prev);
      next.has(term) ? next.delete(term) : next.add(term);
      return next;
    });
  };

  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">Healthcare Glossary</h1>
        <p className="page-subtitle">Plain-language definitions of common U.S. healthcare terms.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {terms.map((t) => (
            <div key={t.term} className="step-card">
              <button
                onClick={() => toggleTerm(t.term)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 14, color: "var(--gray-800)" }}>{t.term}</span>
                <span style={{ color: "var(--gray-400)", fontSize: 12 }}>{openTerms.has(t.term) ? "▲" : "▼"}</span>
              </button>
              {openTerms.has(t.term) && (
                <div style={{ padding: "0 20px 16px", fontSize: 13, color: "var(--gray-700)", lineHeight: 1.6, borderTop: "1px solid var(--gray-200)", paddingTop: 12 }}>
                  {t.definition}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
