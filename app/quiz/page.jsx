"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const quizBank = [
  {
    question: "What is the purpose of health insurance in the U.S.?",
    options: [
      "To replace doctors",
      "To reduce healthcare costs",
      "To avoid hospitals",
      "To eliminate care options",
    ],
    answer: "To reduce healthcare costs",
  },
  {
    question: "What is your first step before seeing a doctor?",
    options: [
      "Go to ER",
      "Find insurance",
      "Buy medicine",
      "Call emergency services",
    ],
    answer: "Find insurance",
  },
  {
    question: "Which is TRUE about Primary Care Providers?",
    options: [
      "They are only for emergencies",
      "They are your main ongoing doctor",
      "They replace insurance",
      "They are optional specialists",
    ],
    answer: "They are your main ongoing doctor",
  },
  {
    question: "When should you go to the ER?",
    options: [
      "For routine checkups",
      "For prescription refills",
      "For chest pain or serious injury",
      "For insurance questions",
    ],
    answer: "For chest pain or serious injury",
  },
];

export default function QuizPage() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = quizBank.length;
  const passed = finished && score === total;

   const restartQuiz = () => {
    setIndex(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  };
  
  const [started, setStarted] = useState(false);
  
  // block back navigation during quiz
  useEffect(() => {
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    blockBack();
    window.addEventListener("popstate", blockBack);

    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  const handleNext = () => {
    let newScore = score;

    if (selected === quizBank[index].answer) {
      newScore++;
      setScore(newScore);
    }

    setSelected("");

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const goHome = () => {
    if (passed) router.push("/");
  };

  const goDecisionTree = () => {
    if (passed) router.push("/decision-trees");
  };

  const question = quizBank[index];

  return (
  <div className="quiz-page">
    <div className="quiz-card">

      {/* 1. INSTRUCTIONS SCREEN */}
      {!started ? (
        <>
          <h1 className="title">Reading Verification Quiz</h1>

          <p className="text">
            This quiz ensures you have carefully read the module content before continuing.
          </p>

          <ul className="list">
            <li>You must score 100% to proceed</li>
            <li>Questions come directly from the reading material</li>
            <li>Goals: To ensure you have understand the reading materials and that you understand how to make informed choices</li>
          </ul>

          <p className="warning">
            You must score 100% on this quiz to proceed to the next section.
          </p>

          <button
            className="next-btn"
            onClick={() => setStarted(true)}
          >
            Start Quiz
          </button>
        </>
      ) : !finished ? (

        /* 2. QUIZ SCREEN */
        <>
          <h1 className="title">Reading Quiz</h1>

          <p className="progress">
            Question {index + 1} of {total}
          </p>

          <h2 className="question">{question.question}</h2>

          <div className="options">
            {question.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`option-btn ${
                  selected === opt ? "selected" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            disabled={!selected}
            onClick={handleNext}
            className="next-btn"
          >
            {index + 1 === total ? "Finish Quiz" : "Next"}
          </button>
        </>
      ) : (
        /* 3. RESULT SCREEN */
        <>
          <h1 className="title">
            {passed ? "Passed" : "Not Passed"}
          </h1>

          <p className="score">
            Score: {score} / {total}
          </p>

          {!passed ? (
            <div className="actions">
              <p className="warning">
                You must score 100% to continue. Please retake the quiz.
              </p>

              <button
                className="next-btn"
                onClick={restartQuiz}
              >
                Retake Quiz
              </button>
            </div>
          ) : (
            <div className="actions">
              <Link href="/">
                <button className="next-btn">
                  Go Home
                </button>
              </Link>

              <Link href="/decision-guide">
                <button className="next-btn">
                  Continue to Decision Trees
                </button>
              </Link>
            </div>
          )}
        </>
      )}

    </div>
  </div>
)}