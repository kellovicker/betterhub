import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Eye, EyeOff, Wallet } from "lucide-react";
import RecentActivity from "../components/RecentActivity.jsx";
import { SvcIcon, WalletArt } from "../components/icons.jsx";
import { services } from "../data/services.js";
import { naira, useApp } from "../context/AppContext.jsx";

export default function Home() {
  const { user, setModal } = useApp();
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <section className="u-greet">
        <p>Welcome back</p>
        <h1>{user.name} <span aria-hidden="true">👋</span></h1>
        <p>Let’s make things easier today.</p>
      </section>

      <section className="u-wallet">
        <div className="u-wrow">
          <span className="u-wic"><Wallet size={28} /></span>
          <div className="u-wtxt">
            <span className="u-wl">Available Balance
              <button className="u-eye" onClick={() => setHidden((h) => !h)} aria-label={hidden ? "Show balance" : "Hide balance"}>
                {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
            <p className="u-amt">{hidden ? "₦••••••" : naira(user.bal)}</p>
          </div>
          <button className="u-vd" onClick={() => setModal({ type: "panel", k: "Wallet" })}>View Details <ChevronRight size={14} /></button>
        </div>
        <button className="u-fund" onClick={() => setModal({ type: "fund" })}><Wallet size={20} /><span>Fund Wallet</span><ArrowRight size={18} /></button>
        <WalletArt />
      </section>

      <div className="u-sh">
        <h2><i />Quick Services</h2>
        <Link to="/services">Explore All <ChevronRight size={16} /></Link>
      </div>
      <div className="u-grid">
        {services.map((s, n) => (
          <button key={s.id} className="u-svc" onClick={() => setModal({ type: "svc", n })}>
            <span className="u-sic"><SvcIcon n={n} /></span>
            <span className="u-go"><ArrowRight size={14} /></span>
            <b>{s.short}</b>
            <small>{s.sub}</small>
          </button>
        ))}
      </div>

      <RecentActivity />
    </>
  );
}
