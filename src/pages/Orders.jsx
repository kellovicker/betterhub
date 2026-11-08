import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { useApp, naira } from "../context/AppContext.jsx";

const filters = ["All", "Processing", "Completed", "Cancelled"];

export default function Orders() {
  const { orders } = useApp();
  const [active, setActive] = useState("All");
  const shown = orders.filter((o) => active === "All" || o.status === active);

  return (
    <div className="narrow">
      <h1 className="page__title"><ClipboardList size={26} /> Order History</h1>
      <div className="pills" role="tablist">
        {filters.map((f) => (
          <button key={f} role="tab" aria-selected={active === f} className={"pill" + (active === f ? " is-on" : "")} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>
      {shown.length === 0 ? <p className="empty">No orders yet. Pick a service to place your first order.</p> : shown.map((o) => (
        <div className="row" key={o.id}>
          <div><b>{o.title}</b><small>{o.detail}</small><small>{o.date} · #{o.id}</small></div>
          <div className="row__r"><b>{naira(o.price)}</b><span className={"badge " + (o.status === "Completed" ? "badge--active" : "badge--out")}>{o.status}</span></div>
        </div>
      ))}
    </div>
  );
}
