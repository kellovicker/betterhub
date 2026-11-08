import { useState } from "react";
import { Search } from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";
import { services } from "../data/services.js";
import { useApp } from "../context/AppContext.jsx";

export default function Services() {
  const { setModal } = useApp();
  const [q, setQ] = useState("");
  const list = services.map((s, n) => ({ ...s, n })).filter((s) => (s.title + " " + s.desc).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <h1 className="page__title">All Services</h1>
      <label className="search">
        <Search size={20} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search numbers, VPN, proxies…" />
      </label>
      {list.length === 0 ? (
        <p className="empty">No service matches “{q}”. Try a different word.</p>
      ) : (
        <div className="card-grid">
          {list.map(({ id, n, title, desc, icon: Icon, status }) => (
            <button key={id} className="card" onClick={() => setModal({ type: "svc", n })}>
              <div className="card__top"><span className="card__icon"><Icon size={24} /></span><StatusBadge status={status} /></div>
              <h3 className="card__title">{title}</h3>
              <p className="card__desc">{desc}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
