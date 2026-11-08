import { Link } from "react-router-dom";
import { User, Wallet, Receipt, ClipboardList, KeyRound, Users, Store, HelpCircle, MessageCircle, Bell, ShieldCheck, ChevronRight, Sun, Moon } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

const menu = [
  ["Profile", User], ["Wallet", Wallet], ["Transactions", Receipt], ["Orders", ClipboardList, "/orders"], ["API Access", KeyRound],
  ["Referrals", Users], ["Reseller Portal", Store], ["FAQ", HelpCircle], ["Support & Helpdesk", MessageCircle],
  ["Notifications", Bell], ["Security & 2FA", ShieldCheck],
];

export default function Account() {
  const { user, setModal, logout, theme, toggleTheme } = useApp();
  return (
    <div className="narrow">
      <h1 className="page__title">Account</h1>
      <div className="profile">
        <div className="avatar">{user.name[0]}</div>
        <div><p className="profile__name">{user.name}</p><p className="profile__email">{user.email}</p></div>
      </div>
      <div className="row">
        <span>Appearance</span>
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          <span className={theme === "light" ? "is-on" : ""}><Sun size={16} /></span>
          <span className={theme === "dark" ? "is-on" : ""}><Moon size={16} /></span>
        </button>
      </div>
      <ul className="menu">
        {menu.map(([label, Icon, to]) => (
          <li key={label}>
            {to ? (
              <Link to={to}><Icon size={22} />{label}<ChevronRight size={20} /></Link>
            ) : (
              <button onClick={() => setModal({ type: "panel", k: label })}><Icon size={22} />{label}<ChevronRight size={20} /></button>
            )}
          </li>
        ))}
      </ul>
      <button className="btn btn--out" onClick={logout}>Log out</button>
    </div>
  );
}
