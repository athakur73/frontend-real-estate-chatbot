interface Props {
    sender: "user" | "bot";
    text: string;
  }
  
  export default function ChatMessage({ sender, text }: Props) {
    return (
      <div
        style={{
          textAlign: sender === "user" ? "right" : "left",
          margin: "8px 0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 10,
            background: sender === "user" ? "#d1f5ff" : "#e8e8e8",
          }}
        >
          {text}
        </span>
      </div>
    );
  }
  