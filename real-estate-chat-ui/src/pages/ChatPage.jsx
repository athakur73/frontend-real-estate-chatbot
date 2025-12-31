import { useState } from "react";
import MessageList from "../components/MessageList";
import PropertyList from "../components/PropertyList";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/chatApi";

function ChatPage() {
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
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",   // 🔒 LEFT LOCK
        alignItems: "stretch",
        background: "#F8FAFC"
      }}
    >
      {/* CHAT SIDEBAR */}
      <aside
        style={{
          width: 360,
          minWidth: 360,
          height: "100%",
          background: "#FFFFFF",
          borderRight: "1px solid #E5E7EB",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"      // 🔒 LEFT LOCK
        }}
      >
        <MessageList messages={messages} loading={loading} />

        {/* CHAT INPUT */}
        <div
          style={{
            width: "100%",
            padding: 16,
            borderTop: "1px solid #E5E7EB",
            boxSizing: "border-box"
          }}
        >
          <ChatBox onSend={handleSend} disabled={loading} />
        </div>
      </aside>

      {/* RESULTS PANEL */}
      <main
        style={{
          flex: 1,
          padding: 32,
          overflowY: "auto",
          boxSizing: "border-box"
        }}
      >
        <PropertyList properties={properties} sessionId={sessionId} />
      </main>
    </div>
  );
}

export default ChatPage;
