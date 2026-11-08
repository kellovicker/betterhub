import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export const naira = (n) => "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const rid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
export const ld = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
export const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } };
const today = () => new Date().toLocaleDateString("en-NG", { day: "numeric", month: "short" });

// Demo state lives in localStorage. Replace these actions with API calls once the backend exists.
export function AppProvider({ children }) {
  const [user, setUser] = useState(() => ld("session", null));
  const [orders, setOrders] = useState(() => ld("orders", []));
  const [txs, setTxs] = useState(() => ld("txs", []));
  const [modal, setModal] = useState(null); // { type: "svc", n } | { type: "fund" } | { type: "panel", k }
  const [toastMsg, toast] = useState("");

  useEffect(() => sv("session", user), [user]);
  useEffect(() => sv("orders", orders), [orders]);
  useEffect(() => sv("txs", txs), [txs]);
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => toast(""), 2200);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const login = (u) => setUser({ bal: 0, ...u });
  const logout = () => { setUser(null); setModal(null); };
  const updateUser = (p) => setUser((u) => ({ ...u, ...p }));
  const fund = (a) => {
    setUser((u) => ({ ...u, bal: u.bal + a }));
    setTxs((t) => [{ t: "Wallet funding", a, d: today() }, ...t]);
  };
  const buy = (o) => {
    setUser((u) => ({ ...u, bal: u.bal - o.price }));
    setOrders((x) => [{ ...o, status: "Processing", date: today() }, ...x]);
    setTxs((t) => [{ t: "Purchase: " + o.title, a: -o.price, d: today() }, ...t]);
  };
  const complete = (id) => setOrders((x) => x.map((o) => (o.id === id ? { ...o, status: "Completed" } : o)));

  return (
    <Ctx.Provider value={{ user, orders, txs, modal, setModal, toast, toastMsg, login, logout, updateUser, fund, buy, complete }}>
      {children}
    </Ctx.Provider>
  );
}
