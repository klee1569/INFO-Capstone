"use client";

import { useState } from "react";

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hi, I am WellKare Assistant. Ask me about healthcare terms, where to go on this site, or which WellKare resource might help next.",
  },
];

export default function Chatbot() {
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
    <section className="chatbot-card" aria-label="WellKare Assistant chat">
      <div className="chatbot-messages">
        {messages.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={`chatbot-message-row ${item.role}`}
          >
            <div className={`chatbot-message ${item.role}`}>
              <span className="chatbot-message-label">
                {item.role === "user" ? "You" : "WellKare Assistant"}
              </span>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chatbot-message-row assistant">
            <div className="chatbot-message assistant">
              <span className="chatbot-message-label">WellKare Assistant</span>
              <p>Thinking...</p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="chatbot-error">{error}</p>}

      <form className="chatbot-form" onSubmit={sendMessage}>
        <label className="chatbot-input-label" htmlFor="chatbot-message">
          Message
        </label>
        <textarea
          id="chatbot-message"
          className="chatbot-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage(e);
            }
          }}
          placeholder="Ask about terms, site pages, or next steps..."
          rows={3}
        />
        <button
          className="chatbot-submit"
          type="submit"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? "Sending" : "Send"}
        </button>
      </form>
    </section>
  );
}
