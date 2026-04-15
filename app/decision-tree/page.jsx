import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

const scenarios = [
  { id: "no-insurance", title: "I am sick and don't have insurance"},
  { id: "has-insurance", title: "I have insurance but don't understand it"},
  { id: "child-care", title: "I need care for my child"},
];

export default function DecisionTree() {
  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">Decision Tree: I Need Care</h1>
        <p className="page-subtitle">Choose your situation to get personalized guidance on the right care for you.</p>

        <div className="scenario-list">
          {scenarios.map((s) => (
            <div key={s.id} className="scenario-card">
              <div>
                <div className="scenario-title">{s.title}</div>
              </div>
              <span className="scenario-arrow">›</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
