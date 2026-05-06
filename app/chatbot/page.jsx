import Link from "next/link";
import Navbar from "../../components/Navbar.jsx";
import Chatbot from "../../components/Chatbot.jsx";

export default function ChatbotPage() {
  return (
    <div className="page">
      <Navbar />
      <main className="main-wide">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
        </div>
        <h1 className="page-title">WellKare Assistant</h1>
        <p className="page-subtitle">
          This assistant is for general guidance only and does not provide legal,
          medical, or official eligibility advice.
        </p>
        <Chatbot />
      </main>
    </div>
  );
}
