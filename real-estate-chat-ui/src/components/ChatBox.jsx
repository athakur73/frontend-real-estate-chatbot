import { useState, useRef } from "react";

function ChatBox({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px"; // max ~5 lines
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    autoResize(e.target);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px"; // reset height
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        borderTop: "1px solid #E5E7EB",
        background: "#FFFFFF"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
          background: "#FFFFFF",
          border: "2px solid #2563EB",
          borderRadius: "18px",
          padding: "12px 14px",
          boxShadow: "0 4px 14px rgba(37,99,235,0.18)"
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about homes, budget, location, amenities…"
          disabled={disabled}
          style={{
            flex: 1,
            resize: "none",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "15px",
            lineHeight: "1.6",
            color: "#0F172A",
            minHeight: "44px",   // 👈 bigger default height
            maxHeight: "120px"
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          style={{
            background: disabled || !input.trim() ? "#94A3B8" : "#2563EB",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: disabled || !input.trim() ? "not-allowed" : "pointer",
            alignSelf: "flex-end"
          }}
        >
          Send
        </button>
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "#64748B",
          marginTop: "6px",
          textAlign: "center"
        }}
      >
        Press <b>Enter</b> to send · <b>Shift + Enter</b> for new line
      </div>
    </div>
  );
}

export default ChatBox;
