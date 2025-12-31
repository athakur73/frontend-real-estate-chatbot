import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import RecommendPage from "./pages/RecommendPage";
import logo from "./logo.png";

function App() {
  return (
    <Router>
      <div
        style={{
          height: "100vh",
          background:
            "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)"
        }}
      >
        {/* HEADER */}
        <header
          style={{
            height: 60,
            background: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px"
          }}
        >
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logo} alt="Logo" style={{ height: 32 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                Agent Mira
              </div>
              <div style={{ fontSize: 12, color: "#64748B" }}>
                AI Real Estate Assistant
              </div>
            </div>
          </div>

          {/* NAV */}
          <nav style={{ display: "flex", gap: 16 }}>
            <Link to="/" style={navLink}>Chat</Link>
            <Link to="/recommend" style={navLink}>Recommendations</Link>
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <div
          style={{
            height: "calc(100vh - 60px)",
            padding: "0 clamp(16px, 4vw, 32px)"
          }}
        >
          {/* 🔴 FIX: DO NOT CENTER THIS */}
          <div
            style={{
              maxWidth: 1280,
              marginLeft: 0,
              marginRight: "auto",
              height: "100%"
            }}
          >
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/recommend" element={<RecommendPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

const navLink = {
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  color: "#4F46E5"
};

export default App;
