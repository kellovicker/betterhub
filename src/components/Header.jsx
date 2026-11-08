import { NavLink } from "react-router-dom";
import { Bell, Mail, Lock, Sun, Moon } from "lucide-react";
import useTheme from "../hooks/useTheme.js";
import { items } from "./BottomNav.jsx";

export default function Header({ bare = false }) {
  const { theme, toggle } = useTheme();
  return (
    <header className="header">
      <div className="logo">
        <span className="logo__mark"><Mail size={20} /><span className="logo__lock"><Lock size={15} /></span></span>
        BetterHub
      </div>
      {!bare && (
        <nav className="topnav" aria-label="Main">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "is-active" : "")}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
      )}
      <div className="header__actions">
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
          <span className={theme === "light" ? "is-on" : ""}><Sun size={16} /></span>
          <span className={theme === "dark" ? "is-on" : ""}><Moon size={16} /></span>
        </button>
        {!bare && <button className="icon-btn" aria-label="Notifications"><Bell size={20} /></button>}
      </div>
    </header>
  );
}
