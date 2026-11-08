import { useMemo, useState } from "react";
import { User, Wallet, Receipt, KeyRound, Users, Store, HelpCircle, MessageCircle, Bell, ShieldCheck } from "lucide-react";
import Sheet from "./Sheet.jsx";
import { useApp, naira, rid, ld, sv } from "../context/AppContext.jsx";

const icons = { "Profile": User, "Wallet": Wallet, "Transactions": Receipt, "API Access": KeyRound, "Referrals": Users, "Reseller Portal": Store, "FAQ": HelpCircle, "Support & Helpdesk": MessageCircle, "Notifications": Bell, "Security & 2FA": ShieldCheck };
const faq = [
  ["How fast do I get a number?", "Right after you pay. The SMS usually arrives within a minute."],
  ["What if no SMS arrives?", "Cancel the order and the amount returns to your wallet."],
  ["How do I fund my wallet?", "Open Wallet and pay by card or bank transfer through Paystack."],
  ["Can I get a refund?", "Failed or cancelled orders are refunded to your wallet."],
];
const strong = (p) => p.length >= 8 && /[a-z]/i.test(p) && /\d/.test(p);

export default function Panel({ k }) {
  const { user, txs, setModal, toast, updateUser } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [msg, setMsg] = useState("");
  const [cur, setCur] = useState("");
  const [np, setNp] = useState("");
  const [err, setErr] = useState("");
  const [nf, setNf] = useState(() => ld("notif", { o: 1, w: 1, p: 0 }));
  const [tfa, setTfa] = useState(() => !!ld("tfa", 0));
  const key = useMemo(() => { let v = ld("apikey", null); if (!v) { v = "bh_live_" + rid() + rid() + rid(); sv("apikey", v); } return v; }, []);
  const code = ((user.name || "user").split(" ")[0].toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6) || "USER") + "10";

  const close = () => setModal(null);
  const copy = (t) => navigator.clipboard?.writeText(t).then(() => toast("Copied"), () => toast("Copy is blocked here."));
  const Field = ({ id, label, ...p }) => <div className="fld"><label htmlFor={id}>{label}</label><input id={id} {...p} /></div>;
  const Err = () => err && <em className="err">{err}</em>;

  const body = {
    "Profile": <>
      <Field id="pn" label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <Field id="pe" label="Email" value={user.email} readOnly />
      <Field id="pp" label="Phone number" type="tel" placeholder="e.g. 08012345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Err /><button className="btn btn--pri" onClick={() => { if (name.trim().length < 2) return setErr("Enter your full name."); updateUser({ name: name.trim(), phone: phone.trim() }); close(); toast("Profile saved."); }}>Save changes</button>
    </>,
    "Wallet": <>
      <div className="sum"><span>Available balance</span><b>{naira(user.bal)}</b></div>
      <button className="btn btn--pri" onClick={() => setModal({ type: "fund" })}>Fund wallet</button>
    </>,
    "Transactions": txs.length ? txs.map((t, i) => (
      <div className="row" key={i}><div><b>{t.t}</b><small>{t.d}</small></div><b style={{ color: t.a < 0 ? "var(--text)" : "var(--success)" }}>{t.a < 0 ? "−" : "+"}{naira(Math.abs(t.a))}</b></div>
    )) : <p className="empty">No transactions yet. Fund your wallet to get started.</p>,
    "API Access": <>
      <p className="muted">Use this key to place orders from your own app. Keep it private.</p>
      <Field id="ak" label="Your API key" value={key} readOnly />
      <button className="btn btn--pri" onClick={() => copy(key)}>Copy key</button>
      <p className="note">Demo key. Endpoints and docs arrive with the backend.</p>
    </>,
    "Referrals": <>
      <p className="muted">Share your code. Earn when a friend funds their wallet.</p>
      <Field id="rc" label="Your referral code" value={code} readOnly />
      <button className="btn btn--pri" onClick={() => copy(code)}>Copy code</button>
      <div className="sum"><span>Referrals · Earned</span><b>0 · ₦0</b></div>
    </>,
    "Reseller Portal": <>
      <p className="muted">Buy in bulk at reseller prices and sell under your own brand.</p>
      <div className="row"><span>Discount on all services</span><b>Up to 15%</b></div>
      <div className="row"><span>Minimum first deposit</span><b>₦50,000</b></div>
      <button className="btn btn--pri" onClick={() => { close(); toast("Application sent (demo). We’ll be in touch."); }}>Apply to be a reseller</button>
      <p className="note">Sample terms for the demo.</p>
    </>,
    "FAQ": <>
      {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      <p className="note">Sample answers for the demo.</p>
    </>,
    "Support & Helpdesk": <>
      <div className="fld"><label htmlFor="sj">Topic</label><select id="sj"><option>Order problem</option><option>Wallet or payment</option><option>Account</option><option>Other</option></select></div>
      <div className="fld"><label htmlFor="sm">Message</label><textarea id="sm" rows="4" placeholder="Tell us what happened" value={msg} onChange={(e) => setMsg(e.target.value)} /></div>
      <Err /><button className="btn btn--pri" onClick={() => { if (msg.trim().length < 10) return setErr("Write a few words so we can help."); close(); toast("Message sent (demo)."); }}>Send message</button>
    </>,
    "Notifications": [["o", "Order updates"], ["w", "Wallet alerts"], ["p", "Offers and news"]].map(([id, l]) => (
      <label className="row" key={id}><span>{l}</span>
        <input type="checkbox" checked={!!nf[id]} onChange={(e) => { const v = { ...nf, [id]: e.target.checked ? 1 : 0 }; setNf(v); sv("notif", v); }} />
      </label>
    )),
    "Security & 2FA": <>
      <label className="row"><span>Two-factor authentication</span>
        <input type="checkbox" checked={tfa} onChange={(e) => { setTfa(e.target.checked); sv("tfa", e.target.checked ? 1 : 0); }} />
      </label>
      <Field id="cp" label="Current password" type="password" value={cur} onChange={(e) => setCur(e.target.value)} />
      <Field id="np" label="New password" type="password" value={np} onChange={(e) => setNp(e.target.value)} />
      <Err /><button className="btn btn--pri" onClick={() => { if (!cur) return setErr("Enter your current password."); if (!strong(np)) return setErr("Use 8 or more characters with a letter and a number."); close(); toast("Password updated (demo)."); }}>Update password</button>
    </>,
  }[k];

  return <Sheet title={k} icon={icons[k]}>{body}</Sheet>;
}
