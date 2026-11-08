import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header.jsx";
import ModalHost from "../components/ModalHost.jsx";
import { useApp } from "../context/AppContext.jsx";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^(0|\+?234)[789][01]\d{8}$/;

export default function Auth({ mode }) {
  const su = mode === "signup";
  const { user, login, toast } = useApp();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", ref: "", terms: false });
  const [errs, setErrs] = useState({});
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/" replace />;

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const Field = ({ id, label, ...p }) => (
    <div className={"fld" + (errs[id] ? " bad" : "")}>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={f[id]} onChange={set(id)} {...p} />
      {errs[id] && <em className="err">{errs[id]}</em>}
    </div>
  );

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (su && f.name.trim().length < 2) x.name = "Enter your full name.";
    if (!EMAIL.test(f.email.trim())) x.email = "Enter a valid email address, like name@example.com.";
    if (su && !PHONE.test(f.phone.replace(/[\s-]/g, ""))) x.phone = "Enter a Nigerian number, like 08012345678.";
    if (su ? !(f.password.length >= 8 && /[a-z]/i.test(f.password) && /\d/.test(f.password)) : !f.password)
      x.password = su ? "Use 8 or more characters with a letter and a number." : "Enter your password.";
    if (su && !f.terms) x.terms = "Accept the terms to continue.";
    setErrs(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    // Replace with POST /auth/signup or /auth/login
    setTimeout(() => {
      const raw = su ? f.name.trim() : f.email.split("@")[0];
      login({ name: raw.charAt(0).toUpperCase() + raw.slice(1), email: f.email.trim(), phone: f.phone.trim() });
    }, 600);
  };

  return (
    <div className="app">
      <Header bare />
      <main className="page auth">
        <h1>{su ? "Create your account" : "Welcome back"}</h1>
        <p className="muted">{su ? "Sign up to buy numbers, VPN and more from one Naira wallet." : "Log in to see your wallet and orders."}</p>
        <form onSubmit={submit} noValidate>
          {su && <Field id="name" label="Full name" autoComplete="name" placeholder="e.g. Ada Okafor" />}
          <Field id="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
          {su && <Field id="phone" label="Phone number" type="tel" autoComplete="tel" placeholder="e.g. 08012345678" />}
          <div className={"fld" + (errs.password ? " bad" : "")}>
            <label htmlFor="password">Password</label>
            <div className="pw">
              <input id="password" type={show ? "text" : "password"} value={f.password} onChange={set("password")}
                autoComplete={su ? "new-password" : "current-password"} placeholder={su ? "At least 8 characters" : "Your password"} />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            {errs.password && <em className="err">{errs.password}</em>}
          </div>
          {su ? <Field id="ref" label="Referral code (optional)" autoComplete="off" placeholder="e.g. FRIEND10" />
             : <div className="fl"><button type="button" onClick={() => toast("Password reset arrives with the backend.")}>Forgot password?</button></div>}
          {su && (
            <>
              <label className="check"><input type="checkbox" checked={f.terms} onChange={set("terms")} /><span>I agree to the Terms of Service and Privacy Policy.</span></label>
              {errs.terms && <em className="err">{errs.terms}</em>}
            </>
          )}
          <button className="btn btn--pri" disabled={busy}>{busy ? (su ? "Creating account…" : "Logging in…") : su ? "Create account" : "Log in"}</button>
        </form>
        <p className="alt">{su ? <>Already have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/signup">Create an account</Link></>}</p>
        <p className="note">Demo mode: any valid details work until the backend is connected.</p>
      </main>
      <ModalHost />
    </div>
  );
}
