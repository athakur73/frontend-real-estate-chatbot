import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import RecommendPage from "./pages/RecommendPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import UserPage from "./pages/UserPage";

import logo from "./logo.png";

/**
 * Router wrapper
 */
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)"
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
            </div>
            <div style={{ fontSize: 12, color: "#64748B" }}>
              AI Real Estate Assistant
            </div>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <nav style={{ display: "flex", gap: 8 }}>
          <NavButton to="/">Chat</NavButton>
          <NavButton to="/recommend">Recommendations</NavButton>
          <NavButton to="/add-property">Add Property</NavButton>
          <NavButton to="/me">My Properties</NavButton>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <div
        style={{
          height: "calc(100vh - 60px)",
          padding: "0 clamp(16px, 4vw, 32px)"
        }}
      >
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
            <Route path="/add-property" element={<AddPropertyPage />} />
            <Route path="/me" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable navigation button
 */
function NavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "8px 14px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        textDecoration: "none",
        border: "1px solid",
        transition: "all 0.2s ease",
        background: isActive ? "#4F46E5" : "#F8FAFC",
        color: isActive ? "#FFFFFF" : "#4F46E5",
        borderColor: isActive ? "#4F46E5" : "#E5E7EB"
      })}
    >
      {children}
    </NavLink>
  );
}

export default AppWrapper;
