import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { SvcIcon } from "../components/icons.jsx";
import { services } from "../data/services.js";
import { useApp } from "../context/AppContext.jsx";

export default function Services() {
  const { setModal } = useApp();
  const [q, setQ] = useState("");
  const list = services.map((s, n) => ({ ...s, n })).filter((s) => (s.title + " " + s.desc).toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <>
      <h1 className="page__title">All Services</h1>
      <label className="search">
        <Search size={20} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search WhatsApp, eSIMs, gifting, VPN…" />
      </label>
      {list.length === 0 ? (
        <p className="empty">No service matches “{q}”. Try a different word.</p>
      ) : (
        <div className="u-grid u-grid--2">
          {list.map(({ id, n, title, desc }) => (
            <button key={id} className="u-svc u-svc--lg" onClick={() => setModal({ type: "svc", n })}>
              <span className="u-sic"><SvcIcon n={n} size={38} /></span>
              <span className="u-go"><ArrowRight size={14} /></span>
              <b>{title}</b>
              <small>{desc}</small>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
