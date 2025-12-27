import { useState } from "react";
import MessageList from "./components/MessageList";
import PropertyList from "./components/PropertyList";
import ChatBox from "./components/ChatBox";
import { sendMessage } from "./services/chatApi";

function App() {
  const [messages, setMessages] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const response = await sendMessage(text, sessionId);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.reply }
      ]);

      setProperties(response.properties || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)" // 👈 subtle AI gradient
      }}
    >
      {/* Header */}
      <header
        style={{
          height: 60,
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          fontSize: 16,
          fontWeight: 600,
          color: "#0F172A"
        }}
      >
        <span style={{ color: "#2563EB", marginRight: 8 }}>◆</span>
        Agent Mira
        <span style={{ marginLeft: 10, color: "#64748B", fontWeight: 400 }}>
          AI Real Estate Assistant
        </span>
      </header>

      {/* Main */}
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 60px)"
        }}
      >
        {/* Chat Panel */}
        <aside
          style={{
            width: 360,
            background: "#FAFAFB",
            borderRight: "1px solid #E5E7EB",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <MessageList messages={messages} loading={loading} />
          <ChatBox onSend={handleSend} disabled={loading} />
        </aside>

        {/* Results Panel */}
        <main
          style={{
            flex: 1,
            padding: 32,
            overflowY: "auto",
            background:
              "linear-gradient(180deg, #F1F5F9 0%, #EDE9FE 100%)" // 👈 very light tint
          }}
        >
          <PropertyList
            properties={properties}
            sessionId={sessionId}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
