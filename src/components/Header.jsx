import { Link } from "react-router-dom";
import { Bell, Sun, Moon } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Header({ bare = false }) {
  const { theme, toggleTheme, user, orders, setModal } = useApp();
  const processing = orders.filter((o) => o.status === "Processing").length;
  return (
    <header className="u-hero">
      <div className="u-brand">
        <img className="u-logo" src="/logo-dark.png" alt="" width="46" height="38" />
        <div><b>Better Hub</b><small>Secure • Fast • Reliable</small></div>
      </div>
      <div className="u-hact">
        <button className="u-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          <span className={theme === "light" ? "on" : ""}><Sun size={18} /></span>
          <span className={theme === "dark" ? "on" : ""}><Moon size={18} /></span>
        </button>
        {!bare && (
          <>
            <button className="u-bell" aria-label="Notifications" onClick={() => setModal({ type: "panel", k: "Notifications" })}>
              <Bell size={24} />{processing > 0 && <i>{processing}</i>}
            </button>
            <Link className="u-avatar" to="/account" aria-label="Account">{user?.name?.[0]?.toUpperCase() ?? "?"}<i /></Link>
          </>
        )}
      </div>
    </header>
  );
}
