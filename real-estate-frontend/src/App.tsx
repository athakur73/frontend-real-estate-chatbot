import React, { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import PropertyList from "./components/PropertyList";

interface Message {
  sender: "user" | "bot";
  text?: string;
  properties?: any[];
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => crypto.randomUUID());

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((m) => [...m, userMsg]);

    const res = await fetch("http://localhost:8001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        message: input,
      }),
    });

    const data = await res.json();

    if (data.type === "text") {
      setMessages((m) => [...m, { sender: "bot", text: data.message }]);
    }

    if (data.type === "property_list") {
      setMessages((m) => [
        ...m,
        { sender: "bot", text: `Found ${data.count} properties:` },
        { sender: "bot", properties: data.items },
      ]);
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }}>
      <h2 className="app-title"> 🤖 Agent Mira — Your Property Assistant</h2>


      <div
        style={{
          border: "1px solid #ddd",
          padding: 12,
          borderRadius: 8,
          height: 500,
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {messages.map((msg, idx) =>
          msg.properties ? (
            <PropertyList key={idx} properties={msg.properties} />
          ) : (
            <ChatMessage key={idx} sender={msg.sender} text={msg.text!} />
          )
        )}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 10 }}
          placeholder="Type your message…"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
