import { Link } from "react-router-dom";
import { ChevronRight, Clock, Check } from "lucide-react";
import { services } from "../data/services.js";
import { SvcIcon } from "./icons.jsx";
import { naira, useApp } from "../context/AppContext.jsx";

const ago = (ts, d) => {
  if (!ts) return d || "";
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
};

export default function RecentActivity() {
  const { orders, txs } = useApp();
  const rows = [
    ...txs.filter((t) => t.a > 0).map((t) => ({ ts: t.ts || 0, d: t.d, ok: true, title: "Wallet Funded", sub: naira(t.a).replace(".00", "") + " added to your wallet", st: "Success", cls: "ok" })),
    ...orders.map((o) => ({
      ts: o.ts || 0, d: o.date, n: Math.max(0, services.findIndex((s) => s.title === o.title)), title: o.title, sub: o.detail || "", st: o.status,
      cls: o.status === "Completed" ? "info" : o.status === "Processing" ? "warn" : "bad",
    })),
  ].sort((a, b) => b.ts - a.ts).slice(0, 3);

  return (
    <section className="u-act">
      <div className="u-sh">
        <h2><span className="u-aic"><Clock size={22} /></span>Recent Activity</h2>
        <Link to="/orders">View All <ChevronRight size={16} /></Link>
      </div>
      {rows.length === 0 && <p className="empty">No activity yet. Fund your wallet or order a service to see it here.</p>}
      {rows.map((a, i) => (
        <div className="u-row" key={i}>
          <span className={"u-ric" + (a.ok ? " ok" : "")}>{a.ok ? <Check size={22} /> : <SvcIcon n={a.n} size={26} />}</span>
          <div className="u-rtx"><b>{a.title}</b><small>{a.sub}</small></div>
          <div className="u-rr"><small>{ago(a.ts, a.d)}</small><span className={"u-pill " + a.cls}>{a.st}</span></div>
        </div>
      ))}
    </section>
  );
}
