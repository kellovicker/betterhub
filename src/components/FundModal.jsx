import { useState } from "react";
import { Wallet } from "lucide-react";
import Sheet from "./Sheet.jsx";
import { useApp, naira } from "../context/AppContext.jsx";

export default function FundModal() {
  const { user, fund, setModal, toast } = useApp();
  const [amt, setAmt] = useState("");
  const [err, setErr] = useState("");

  const pay = () => {
    const a = +amt;
    if (!(a >= 100)) return setErr("Enter an amount of ₦100 or more.");
    fund(a); // replace with Paystack checkout + webhook
    setModal(null);
    toast(`${naira(a)} added to your wallet (demo).`);
  };

  return (
    <Sheet title="Fund wallet" icon={Wallet}>
      <p className="muted">Current balance: <b>{naira(user.bal)}</b></p>
      <div className="chips">
        {[1000, 2000, 5000, 10000].map((a) => (
          <button key={a} className="pill" onClick={() => setAmt(String(a))}>₦{a.toLocaleString()}</button>
        ))}
      </div>
      <div className="fld">
        <label htmlFor="fa">Amount (₦)</label>
        <input id="fa" type="number" inputMode="numeric" min="100" placeholder="e.g. 5000" value={amt} onChange={(e) => setAmt(e.target.value)} />
      </div>
      {err && <em className="err">{err}</em>}
      <button className="btn btn--pri" onClick={pay}>Pay with Paystack</button>
      <p className="note">Demo: no real payment is taken. Paystack goes live with the backend.</p>
    </Sheet>
  );
}
