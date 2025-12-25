import React, { useState } from "react";
import PropertyList from "./PropertyList";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    const res = await fetch("http://localhost:8001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: "demo123",
        message: input
      }),
    });

    const data = await res.json();

    if (data.type === "text") {
      setMessages(prev => [...prev, { from: "bot", text: data.message }]);
    }

    if (data.type === "property_list") {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: `Found ${data.count} properties:` },
        { from: "bot", properties: data.items }
      ]);
    }

    setInput("");
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "8px",
          minHeight: "400px"
        }}
      >
        {messages.map((msg, idx) =>
          msg.properties ? (
            <PropertyList key={idx} properties={msg.properties} />
          ) : (
            <p key={idx}>
              <strong>{msg.from === "user" ? "You" : "Bot"}:</strong>{" "}
              {msg.text}
            </p>
          )
        )}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ width: "80%" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
}
