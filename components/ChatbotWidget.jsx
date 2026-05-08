"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hi, I am WellKare Assistant. Ask me about healthcare terms, where to go on this site, or which WellKare resource might help next.",
  },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (event) => {
    event?.preventDefault();

    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get a response right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(err.message || "Unable to get a response right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-widget${isOpen ? " open" : ""}`}>
      {isOpen && (
        <section className="chatbot-widget-panel" aria-label="WellKare Assistant chat">
          <header className="chatbot-widget-header">
            <div>
              <h2 className="chatbot-widget-title">WellKare Assistant</h2>
              <p className="chatbot-widget-disclaimer">
                General guidance only. Not legal, medical, or official eligibility advice.
              </p>
            </div>
            <button
              className="chatbot-widget-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
            >
              -
            </button>
          </header>

          <div className="chatbot-widget-messages">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`chatbot-widget-message-row ${item.role}`}
              >
                <div className={`chatbot-widget-message ${item.role}`}>
                  <span className="chatbot-widget-message-label">
                    {item.role === "user" ? "You" : "WellKare Assistant"}
                  </span>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-widget-message-row assistant">
                <div className="chatbot-widget-message assistant">
                  <span className="chatbot-widget-message-label">
                    WellKare Assistant
                  </span>
                  <p>Thinking...</p>
                </div>
              </div>
            )}
          </div>

          {error && <p className="chatbot-widget-error">{error}</p>}

          <form className="chatbot-widget-form" onSubmit={sendMessage}>
            <label className="chatbot-widget-input-label" htmlFor="chatbot-widget-message">
              Message
            </label>
            <textarea
              id="chatbot-widget-message"
              className="chatbot-widget-input"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  sendMessage(event);
                }
              }}
              placeholder="Ask about terms, site pages, or next steps..."
              rows={3}
            />
            <button
              className="chatbot-widget-submit"
              type="submit"
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? "Sending" : "Send"}
            </button>
          </form>
        </section>
      )}

      <button
        className="chatbot-widget-button"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Minimize WellKare Assistant" : "Open WellKare Assistant"}
      >
        {isOpen ? "Chat" : "Ask"}
      </button>
    </div>
  );
}
