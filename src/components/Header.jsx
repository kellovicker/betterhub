import { NavLink } from "react-router-dom";
import { Bell } from "lucide-react";
import { items } from "./BottomNav.jsx";

export default function Header({ bare = false }) {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img logo__img--l" src="/logo-light.png" alt="" width="53" height="44" />
        <img className="logo__img logo__img--d" src="/logo-dark.png" alt="" width="53" height="44" />
        Better Hub
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
        {!bare && <button className="icon-btn" aria-label="Notifications"><Bell size={20} /></button>}
      </div>
    </header>
  );
}
