import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sheet from "./Sheet.jsx";
import { useApp, naira, rid } from "../context/AppContext.jsx";
import { services } from "../data/services.js";

export default function ServiceModal({ n }) {
  const { user, buy, complete, setModal, toast } = useApp();
  const nav = useNavigate();
  const S = services[n], c = S.cfg;
  const [sel, setSel] = useState(c.sel.map(() => 0));
  const [inp, setInp] = useState("");
  const [qty, setQty] = useState(c.qty ? c.qty[2] : 0);
  const [err, setErr] = useState(null);
  const [done, setDone] = useState(null);
  const [code, setCode] = useState("");

  const picks = c.sel.map((x, i) => x[1][sel[i]]);
  const price = Math.round(picks.reduce((a, o) => a + (o[1] || 0), 0) * (c.qty ? (+qty || 0) / c.qty[3] : 1));
  const copy = (t) => navigator.clipboard?.writeText(t).then(() => toast("Copied"), () => toast("Copy is blocked here."));

  const submit = () => {
    if (c.inp && inp.trim().length < 3) return setErr({ text: `Enter the ${c.inp[0].toLowerCase()}.` });
    if (c.qty && !(+qty >= c.qty[1])) return setErr({ text: `The minimum is ${c.qty[1]}.` });
    if (user.bal < price) return setErr({ text: `Not enough balance. You need ${naira(price - user.bal)} more.`, fund: true });
    const o = {
      id: rid(), title: S.title, price,
      detail: [...picks.map((p) => p[0]), c.qty && "×" + (+qty).toLocaleString(), c.inp && inp.trim()].filter(Boolean).join(" · "),
    };
    buy(o); // replace with POST /orders
    setDone({ o, num: c.num ? `${c.prefix} ${Math.floor(Math.random() * 9e8) + 1e8}` : "" });
    if (c.num) setTimeout(() => { complete(o.id); setCode(String(Math.floor(Math.random() * 9e5) + 1e5)); }, 4000);
  };

  if (done) {
    return (
      <Sheet title={c.num ? "Your number" : "Order placed"} icon={S.icon}>
        <div className="done">
          {c.num ? (
            <>
              <p className="muted">Use this number now. We’re waiting for the SMS.</p>
              <p className="big">{done.num}</p>
              <button className="pill" onClick={() => copy(done.num)}>Copy number</button>
              <p className="muted" style={{ marginTop: 16 }}>
                {code ? <>Your code: <b className="big">{code}</b><br /><button className="pill" onClick={() => copy(code)}>Copy code</button></> : "Waiting for SMS…"}
              </p>
            </>
          ) : (
            <>
              <p className="big">#{done.o.id}</p>
              <p className="muted">{S.title} order received. Track it under Orders. The status updates when it’s delivered.</p>
            </>
          )}
        </div>
        <button className="btn btn--pri" onClick={() => { setModal(null); if (!c.num) nav("/orders"); }}>{c.num ? "Close" : "View orders"}</button>
        <p className="note">Demo: orders are simulated until the backend and providers are connected.</p>
      </Sheet>
    );
  }

  return (
    <Sheet title={S.title} icon={S.icon}>
      <p className="muted">{c.sub}</p>
      {c.sel.map((x, i) => (
        <div className="fld" key={x[0]}>
          <label htmlFor={"s" + i}>{x[0]}</label>
          <select id={"s" + i} value={sel[i]} onChange={(e) => setSel(sel.map((v, j) => (j === i ? +e.target.value : v)))}>
            {x[1].map((o, k) => <option key={o[0]} value={k}>{o[0]}</option>)}
          </select>
        </div>
      ))}
      {c.inp && (
        <div className="fld">
          <label htmlFor="inp">{c.inp[0]}</label>
          <input id="inp" placeholder={c.inp[1]} autoComplete="off" value={inp} onChange={(e) => setInp(e.target.value)} />
        </div>
      )}
      {c.qty && (
        <div className="fld">
          <label htmlFor="qty">{c.qty[0]}</label>
          <input id="qty" type="number" inputMode="numeric" min={c.qty[1]} value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
      )}
      <div className="sum"><span>Total</span><b>{naira(price)}</b></div>
      {err && (
        <em className="err">
          {err.text} {err.fund && <button className="lnk" onClick={() => setModal({ type: "fund" })}>Fund wallet</button>}
        </em>
      )}
      <button className="btn btn--pri" onClick={submit}>{c.cta}</button>
    </Sheet>
  );
}
