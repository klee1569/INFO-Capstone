"use client";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

const terms = [
  {
    letter: "A",
    term: "Appeal",
    definition: "A formal request to your insurance company to reconsider a decision they made, such as denying coverage for a service or medication. You have the right to appeal any denial, and your doctor can often help by submitting a letter of medical necessity.",
  },
  {
    letter: "A",
    term: "Apple Health",
    definition: "Washington State's version of Medicaid. It provides free or low-cost health coverage to residents who qualify based on income, age, disability, or family situation. You can apply at wahealthplanfinder.org.",
  },
  {
    letter: "C",
    term: "Charity Care",
    definition: "Free or discounted medical services offered by hospitals and clinics to patients who cannot afford to pay. Most nonprofit hospitals are required to have a charity care program. Ask the billing department about it before assuming you have to pay the full amount.",
  },
  {
    letter: "C",
    term: "CHIP",
    definition: "The Children's Health Insurance Program. It provides low-cost or free health coverage to children in families that earn too much to qualify for Medicaid but cannot afford private insurance. In Washington State it is administered through Apple Health.",
  },
  {
    letter: "C",
    term: "COBRA",
    definition: "A federal program that lets you keep your employer-sponsored health insurance for a limited time after leaving a job. The coverage is identical to what you had, but you pay the full premium yourself, which can be expensive. Coverage typically lasts up to 18 months.",
  },
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
    letter: "D",
    term: "Discharge Summary",
    definition: "A document given to you when you leave a hospital that outlines your diagnosis, the treatment you received, any medications prescribed, and recommended follow-up steps. Keep this document and share it with your primary care doctor.",
  },
  {
    letter: "E",
    term: "Explanation of Benefits (EOB)",
    definition: "A statement from your insurance company that explains what was billed, what your insurance covered, and what you owe after a medical visit. It is not a bill, but it helps you verify that charges are accurate. Review it carefully after every visit.",
  },
  {
    letter: "G",
    term: "Generic Drug",
    definition: "A medication that contains the same active ingredients as a brand-name drug but is sold at a much lower price. Generic drugs are held to the same safety and effectiveness standards. Ask your doctor or pharmacist if a generic version is available for your prescription.",
  },
  {
    letter: "I",
    term: "In-Network",
    definition: "Doctors, hospitals, and clinics that have an agreement with your insurance company to provide care at a lower rate. Seeing an in-network provider almost always costs less than going out-of-network. Always check before your visit.",
  },
  {
    letter: "M",
    term: "Medicaid",
    definition: "A government program that provides free or low-cost health coverage to people with limited income. Eligibility varies by state. In Washington State it is called Apple Health. You can apply year-round regardless of open enrollment periods.",
  },
  {
    letter: "M",
    term: "Medicare",
    definition: "A federal health insurance program for people 65 and older, and for certain younger people with disabilities. It has different parts: Part A covers hospital stays, Part B covers doctor visits and outpatient care, and Part D covers prescription drugs.",
  },
  {
    letter: "P",
    term: "Patient Advocate",
    definition: "A person who helps you navigate the healthcare system, understand your rights, resolve billing disputes, or communicate with your insurance company. Some hospitals have patient advocates on staff. Nonprofit organizations also offer this service at no cost.",
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
  {
    letter: "P",
    term: "Prior Authorization",
    definition: "Approval that your insurance company requires before they will cover certain medications, procedures, or specialist visits. Your doctor typically submits this request on your behalf. Without it, your insurance may refuse to pay even if the care is medically necessary.",
  },
  {
    letter: "R",
    term: "Referral",
    definition: "A recommendation from your primary care doctor to see a specialist. Many insurance plans require a referral before they will cover a specialist visit. Going without one when your plan requires it could mean paying the full cost out of pocket.",
  },
  {
    letter: "S",
    term: "Sliding Scale Fee",
    definition: "A payment structure used by some clinics where what you pay is based on your income. People with lower incomes pay less, sometimes very little. Community health centers commonly use this model to make care accessible to everyone.",
  },
  {
    letter: "S",
    term: "Special Enrollment Period",
    definition: "A window of time outside the regular open enrollment period during which you can sign up for or change health insurance. It is triggered by certain life events such as losing a job, getting married, having a baby, or moving to a new state. You typically have 60 days from the event to enroll.",
  },
];

export default function Glossary() {
  const [openTerms, setOpenTerms] = useState(new Set());
  const [search, setSearch] = useState("");

  const toggleTerm = (term) => {
    setOpenTerms((prev) => {
      const next = new Set(prev);
      next.has(term) ? next.delete(term) : next.add(term);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return terms;
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query)
    );
  }, [search]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 && (
          <p style={{ fontSize: 14, color: "var(--gray-500)", marginBottom: 16 }}>
            No terms found for "{search}".
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((t) => (
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