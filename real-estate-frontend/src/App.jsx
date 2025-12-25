import { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropertyList from "./components/PropertyList";
import "/src/App.css";

const SESSION_ID = "user-1";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const chatRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message.trim();

    // show user msg
    setChat(prev => [...prev, { sender: "You", text: userMsg }]);

    try {
      const res = await axios.post("http://127.0.0.1:8001/chat/", {
        session_id: SESSION_ID,
        message: userMsg
      });

      const data = res.data;

      // 🟡 TEXT REPLY (no properties returned)
      if (data.type === "text") {

        // ❗ clear previous results
        setProperties([]);
        setSearchCompleted(false);

        setChat(prev => [...prev, { sender: "Agent Mira", text: data.message }]);
      }

      // 🟢 PROPERTY RESULTS
      if (data.type === "property_list") {
        setSearchCompleted(true);
        setProperties(data.items);

        setChat(prev => [
          ...prev,
          { sender: "Agent Mira", text: "Here are the matching properties 😊" }
        ]);
      }

    } catch (err) {
      console.error(err);
      setChat(prev => [
        ...prev,
        { sender: "Agent Mira", text: "Something went wrong — try again." }
      ]);
    }

    setMessage("");
  };

  const saveProperty = async (property) => {
    try {
      await axios.post("http://127.0.0.1:8001/saved-properties/", property);
      alert("Property saved!");
    } catch {
      alert("Failed to save property");
    }
  };

  return (
    <div className="app">
      <h1 className="title">
        🏡 Agent Mira — Real Estate Assistant
      </h1>

      {/* CHAT CARD */}
      <div className="chat-card">
        <div className="chat-history" ref={chatRef}>
          {chat.map((c, i) => (
            <div key={i} className={`chat-line ${c.sender === "You" ? "you" : "bot"}`}>
              <span className="sender">{c.sender}:</span> {c.text}
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="chat-input-bar">
          <input
            className="chat-text"
            placeholder="Message Agent Mira…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* PROPERTY LIST */}
      <h2 className="section">Available Properties</h2>

      <PropertyList
        properties={properties}
        onSave={saveProperty}
        searchCompleted={searchCompleted}
      />
    </div>
  );
}
