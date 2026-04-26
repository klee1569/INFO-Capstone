"use client";
import { useState, useMemo } from "react";
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
          { label: "Not an emergency, I can wait", next: 1 },
          { label: "It feels like an emergency", result: "Go to the nearest Emergency Room. Call 911 if needed." },
        ],
      },
      {
        question: "Do you have a regular income?",
        options: [
          { label: "Yes", result: "Visit a Community Health Center. They charge based on your income. Find one at findahealthcenter.hrsa.gov." },
          { label: "No or very little", result: "You likely qualify for Medicaid (Apple Health in WA). Apply at wahealthplanfinder.org." },
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
          { label: "I don't know what my plan covers", next: 1 },
          { label: "I got a bill I don't understand", result: "Call the number on your insurance card and ask for an Explanation of Benefits (EOB). You have the right to dispute charges." },
        ],
      },
      {
        question: "Do you have a primary care doctor?",
        options: [
          { label: "Yes", result: "Call your primary care doctor first. Always check that a provider is in-network before your visit to avoid surprise costs." },
          { label: "No", result: "Use your insurance company's website to find an in-network primary care doctor near you." },
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
          { label: "Minor illness or routine checkup", next: 1 },
          { label: "Serious injury or breathing problems", result: "Go to a Pediatric Emergency Room or call 911. Seattle Children's Hospital has 24/7 emergency care." },
        ],
      },
      {
        question: "Does your child have insurance?",
        options: [
          { label: "Yes", result: "See your child's pediatrician. Avoid the ER for non-emergencies — it costs significantly more." },
          { label: "No", result: "Children under 19 in Washington often qualify for Apple Health at no cost. Apply at wahealthplanfinder.org." },
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
          { label: "I need help getting insurance", next: 1 },
        ],
      },
      {
        question: "How would you like to get help?",
        options: [
          { label: "I want to speak with a representative", result: "Call the Washington Healthplanfinder support line at 1-855-923-4633. They can walk you through your options and help you enroll." },
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
  {
    id: "mental-health",
    title: "I need mental health support",
    subtitle: "Find the right mental health care for your situation.",
    steps: [
      {
        question: "How are you feeling right now?",
        options: [
          { label: "I am in crisis or having thoughts of self-harm", result: "Please call or text 988 to reach the Suicide and Crisis Lifeline. They are available 24/7. If you are in immediate danger, call 911." },
          { label: "I need ongoing support but I am not in crisis", next: 1 },
        ],
      },
      {
        question: "Do you have health insurance?",
        options: [
          { label: "Yes", result: "Most insurance plans are required to cover mental health services. Call the number on your card and ask for a list of in-network therapists or psychiatrists near you." },
          { label: "No", result: "Community health centers often offer low-cost counseling on a sliding scale. You may also qualify for Apple Health, which covers mental health services. Apply at wahealthplanfinder.org." },
        ],
      },
    ],
  },
  {
    id: "prescription",
    title: "I need help with a prescription",
    subtitle: "Find ways to lower the cost of your medication.",
    steps: [
      {
        question: "Do you have health insurance?",
        options: [
          { label: "Yes", next: 1 },
          { label: "No", result: "Look into GoodRx at goodrx.com, which offers coupons that can significantly lower prescription costs. Many drug manufacturers also offer patient assistance programs if you qualify." },
        ],
      },
      {
        question: "Is your insurance covering the medication?",
        options: [
          { label: "Yes, but it is still expensive", result: "Ask your doctor if a generic version of the medication is available. Generic drugs contain the same active ingredients and are often a fraction of the cost." },
          { label: "No, my insurance denied it", result: "You can request a prior authorization or file an appeal with your insurance company. Ask your doctor to write a letter of medical necessity to support your case." },
        ],
      },
    ],
  },
  {
    id: "pregnant",
    title: "I am pregnant and need care",
    subtitle: "Get connected to prenatal care as early as possible.",
    steps: [
      {
        question: "Do you currently have health insurance?",
        options: [
          { label: "Yes", result: "Contact your insurance provider to find an in-network OB-GYN or midwife. Prenatal visits are typically covered, and it is important to start care early." },
          { label: "No", next: 1 },
        ],
      },
      {
        question: "Do you know your household income level?",
        options: [
          { label: "Low or no income", result: "You very likely qualify for Apple Health for Pregnant Women in Washington State, which provides full coverage. Apply immediately at wahealthplanfinder.org." },
          { label: "Moderate income", result: "You may qualify for a subsidized plan on the Washington Healthplanfinder marketplace. Apply at wahealthplanfinder.org. Prenatal care can also be accessed at community health centers on a sliding scale." },
        ],
      },
    ],
  },
  {
    id: "dental",
    title: "I need dental care",
    subtitle: "Find affordable dental care in your area.",
    steps: [
      {
        question: "How urgent is your dental issue?",
        options: [
          { label: "I have severe pain or swelling", result: "This may be a dental emergency. Look for an emergency dental clinic in your area or go to an urgent care clinic. Untreated dental infections can become serious quickly." },
          { label: "It is not urgent", next: 1 },
        ],
      },
      {
        question: "Do you have dental insurance?",
        options: [
          { label: "Yes", result: "Contact your dental insurance provider to find an in-network dentist near you. Routine cleanings and exams are typically covered at no cost." },
          { label: "No", result: "Look into dental schools in your area, which offer care at reduced rates performed by supervised students. Community health centers in Washington also provide low-cost dental services." },
        ],
      },
    ],
  },
  {
    id: "vision",
    title: "I need vision care",
    subtitle: "Find affordable eye care and glasses.",
    steps: [
      {
        question: "Do you have health or vision insurance?",
        options: [
          { label: "Yes", next: 1 },
          { label: "No", result: "Many optical retailers like Costco and Walmart offer low-cost eye exams without insurance. For glasses, sites like Zenni or EyeBuyDirect offer frames starting at very low prices." },
        ],
      },
      {
        question: "Does your plan include vision coverage?",
        options: [
          { label: "Yes", result: "Use your insurance portal to find an in-network optometrist. Most vision plans cover one eye exam per year and a set allowance for frames or contacts." },
          { label: "I am not sure or no", result: "Call the number on your insurance card and ask specifically about vision benefits. If vision is not covered, community health centers sometimes offer basic eye care on a sliding scale." },
        ],
      },
    ],
  },
  {
    id: "unexpected-bill",
    title: "I received an unexpected medical bill",
    subtitle: "Understand your options before you pay.",
    steps: [
      {
        question: "Have you reviewed the bill for errors?",
        options: [
          { label: "No, I haven't checked yet", result: "Request an itemized bill from the provider and compare it to your Explanation of Benefits (EOB) from your insurance. Billing errors are common. If something looks wrong, call both the provider and your insurer to dispute it." },
          { label: "Yes, the bill looks correct but I can't afford it", next: 1 },
        ],
      },
      {
        question: "Have you contacted the provider's billing department?",
        options: [
          { label: "Not yet", result: "Call the billing department directly and ask about financial assistance programs, charity care, or a payment plan. Most hospitals are required to offer financial assistance and many will negotiate the amount." },
          { label: "Yes, they weren't helpful", result: "Contact the Washington State Insurance Commissioner at insurance.wa.gov if you believe a claim was handled incorrectly. You can also seek help from a patient advocate or nonprofit credit counselor." },
        ],
      },
    ],
  },
  {
    id: "elderly-family",
    title: "I need care for an elderly family member",
    subtitle: "Navigate care options for older adults.",
    steps: [
      {
        question: "Is your family member currently on Medicare?",
        options: [
          { label: "Yes", next: 1 },
          { label: "No or I am not sure", result: "Anyone 65 or older is typically eligible for Medicare. Visit medicare.gov or call 1-800-MEDICARE to check eligibility and enroll. If their income is low, they may also qualify for Medicaid to cover additional costs." },
        ],
      },
      {
        question: "What type of support do they need?",
        options: [
          { label: "Medical appointments and ongoing care", result: "Make sure they have a primary care doctor who accepts Medicare. Medicare covers most doctor visits, hospital stays, and many preventive services." },
          { label: "Help at home or long-term care", result: "Washington State's Community Options Program Entry System (COPES) helps seniors stay at home with support services. Contact the Area Agency on Aging at agingkingcounty.org for local resources." },
        ],
      },
    ],
  },
  {
    id: "student",
    title: "I am a student and need care",
    subtitle: "Find care that fits a student's budget and schedule.",
    steps: [
      {
        question: "Are you currently enrolled in a college or university?",
        options: [
          { label: "Yes", next: 1 },
          { label: "No", result: "If you are under 26, you may still be eligible to stay on a parent's health insurance plan. Otherwise, check if you qualify for Medicaid at wahealthplanfinder.org based on your income." },
        ],
      },
      {
        question: "Does your school offer a student health center?",
        options: [
          { label: "Yes", result: "Your campus health center is often the most affordable and convenient option. Many offer free or low-cost visits for enrolled students and can refer you to specialists if needed." },
          { label: "No or I need more than basic care", result: "Check if you qualify for Apple Health based on your income, as many students do. You can also visit a community health center nearby that charges on a sliding scale." },
        ],
      },
    ],
  },
  {
    id: "lost-job-insurance",
    title: "I recently lost my job and my insurance",
    subtitle: "Find coverage after losing employer insurance.",
    steps: [
      {
        question: "How long ago did you lose your coverage?",
        options: [
          { label: "Less than 60 days ago", next: 1 },
          { label: "More than 60 days ago", result: "You may have missed the special enrollment window for most plans. Check if you qualify for Medicaid at wahealthplanfinder.org, as Medicaid enrollment is open year-round regardless of when you lost coverage." },
        ],
      },
      {
        question: "What is your current income situation?",
        options: [
          { label: "Low or no income right now", result: "You likely qualify for Apple Health (Medicaid) in Washington State. It is free or very low cost and covers a wide range of services. Apply at wahealthplanfinder.org." },
          { label: "I have some income or savings", result: "You have two main options: COBRA lets you keep your previous employer plan for up to 18 months but is often expensive. Alternatively, a marketplace plan through wahealthplanfinder.org may offer subsidies based on your income." },
        ],
      },
    ],
  },
  {
    id: "specialist",
    title: "I need to see a specialist",
    subtitle: "Get to the right specialist without overpaying.",
    steps: [
      {
        question: "Have you seen your primary care doctor about this first?",
        options: [
          { label: "Yes, they gave me a referral", next: 1 },
          { label: "No, I want to go directly", result: "Many insurance plans require a referral from your primary care doctor before they will cover a specialist visit. Skipping this step could mean paying the full cost yourself. Check your plan's requirements first." },
        ],
      },
      {
        question: "Do you have insurance?",
        options: [
          { label: "Yes", result: "Use your insurance company's provider directory to find an in-network specialist. Bring your referral and insurance card to your appointment, and confirm the visit is covered beforehand." },
          { label: "No", result: "Community health centers can sometimes connect you with specialists at reduced cost. Some specialists also offer self-pay discounts if you ask upfront. University medical centers may also offer lower rates." },
        ],
      },
    ],
  },
  {
    id: "language-barrier",
    title: "I need care but have a language barrier",
    subtitle: "Access care in your language.",
    steps: [
      {
        question: "Do you have a preferred language other than English?",
        options: [
          { label: "Yes, Spanish", result: "Many clinics in Seattle offer Spanish-speaking staff. HealthPoint and Sea Mar Community Health Centers specifically serve Spanish-speaking communities throughout the Seattle area." },
          { label: "Yes, another language", next: 1 },
        ],
      },
      {
        question: "Do you have health insurance?",
        options: [
          { label: "Yes", result: "Call the member services number on your insurance card and ask for a list of providers who speak your language. Under federal law, healthcare providers receiving federal funding must provide interpreter services at no cost to you." },
          { label: "No", result: "Community health centers are required to provide interpreter services at no cost regardless of insurance status. Sea Mar and HealthPoint serve many language communities across the Seattle area." },
        ],
      },
    ],
  },
  {
    id: "hospital-followup",
    title: "I need follow-up care after a hospital stay",
    subtitle: "Make sure your recovery stays on track.",
    steps: [
      {
        question: "Did the hospital give you discharge instructions?",
        options: [
          { label: "Yes, I have them", next: 1 },
          { label: "No or I lost them", result: "Call the hospital and ask for a copy of your discharge summary. This document lists your diagnosis, medications, and recommended follow-up steps. Your primary care doctor will also need it." },
        ],
      },
      {
        question: "What kind of follow-up do you need?",
        options: [
          { label: "A follow-up appointment with a doctor", result: "Contact your primary care doctor first and bring your discharge summary. If you were referred to a specialist during your stay, call their office to schedule as soon as possible. Most follow-ups should happen within one to two weeks." },
          { label: "Help at home during recovery", result: "Ask your doctor about home health services, which may be covered by your insurance. In Washington State, you can also contact the Area Agency on Aging or 211 for community support resources." },
        ],
      },
    ],
  },
];

export default function DecisionTree() {
  const [activeId, setActiveId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");

  const scenario = scenarios.find((s) => s.id === activeId);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return scenarios;
    return scenarios.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.subtitle.toLowerCase().includes(query)
    );
  }, [search]);

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
                  <button key={opt.label} onClick={() => handleOption(opt)} className="flow-option">
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

        <input
          type="text"
          placeholder="Search scenarios..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 && (
          <p style={{ fontSize: 14, color: "var(--gray-500)", marginBottom: 16 }}>
            No scenarios found for "{search}".
          </p>
        )}

        <div className="scenario-list">
          {filtered.map((s) => (
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

        <div className="disclaimer">
          This tool is for information only. No data is collected. Always consult a healthcare professional for medical advice.
        </div>
      </main>
    </div>
  );
}