function MessageList({ messages, loading }) {
  // Empty state
  if (messages.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          textAlign: "center",
          color: "#475569"
        }}
      >
        <div
          style={{
            fontSize: 28,
            marginBottom: 12,
            color: "#2563EB"
          }}
        >
          🤖
        </div>

        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#0F172A",
            marginBottom: 8
          }}
        >
          Hi, I’m Agent Mira
        </h2>

        <p
          style={{
            fontSize: 14,
            maxWidth: 260,
            marginBottom: 16
          }}
        >
          I can help you find homes.
        </p>

        <div
          style={{
            background: "#F1F5F9",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 13,
            color: "#334155",
            textAlign: "left"
          }}
        >
          <div style={{ marginBottom: 6 }}>Try asking:</div>
          <div>• 3-bed homes in New York under 600K</div>
          <div>• Homes with backyard near schools</div>
          <div>• Show saved properties</div>
        </div>
      </div>
    );
  }

  // Normal chat flow
  return (
    <div
      style={{
        flex: 1,
        padding: "16px",
        overflowY: "auto",
        fontSize: "14px"
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            maxWidth: "85%",
            padding: "10px 12px",
            marginBottom: "8px",
            borderRadius: "8px",
            background: msg.sender === "user" ? "#2563EB" : "#F1F5F9",
            color: msg.sender === "user" ? "#FFFFFF" : "#0F172A",
            marginLeft: msg.sender === "user" ? "auto" : "0"
          }}
        >
          {msg.text}
        </div>
      ))}

      {loading && (
        <div style={{ fontSize: 12, color: "#64748B" }}>
          Agent Mira is typing…
        </div>
      )}
    </div>
  );
}

export default MessageList;
