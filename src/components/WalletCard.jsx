import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useApp, naira } from "../context/AppContext.jsx";

export default function WalletCard() {
  const { user, setModal } = useApp();
  const [hidden, setHidden] = useState(false);
  return (
    <section className="wallet">
      <p className="wallet__label">Available Balance</p>
      <button className="wallet__eye" onClick={() => setHidden((h) => !h)} aria-label={hidden ? "Show balance" : "Hide balance"}>
        {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
      <p className="wallet__amount">{hidden ? "₦••••••" : naira(user.bal)}</p>
      <button className="btn btn--accent" onClick={() => setModal({ type: "fund" })}>Fund Wallet</button>
    </section>
  );
}
