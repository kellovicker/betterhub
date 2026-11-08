import { NavLink } from "react-router-dom";
import { Home, Zap, ClipboardList, User } from "lucide-react";

export const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/services", label: "Services", icon: Zap },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/account", label: "Account", icon: User },
];

// Mobile only: hidden on desktop, where the Header shows the same links at the top.
export default function BottomNav() {
  return (
    <nav className="nav" aria-label="Main">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => "nav__item" + (isActive ? " is-active" : "")}>
          <span className="nav__icon"><Icon size={22} /></span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
