import { NavLink } from "react-router-dom";
import { Home, Zap, ClipboardList, User } from "lucide-react";

export const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/services", label: "Services", icon: Zap },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/account", label: "Account", icon: User },
];

// Floating pill on phones; a row of pills at the top on desktop.
export default function BottomNav() {
  return (
    <nav className="u-nav" aria-label="Main">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => "u-ni" + (isActive ? " on" : "")}>
          <Icon size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
