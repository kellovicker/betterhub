import { useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Sheet({ title, icon: Icon, children }) {
  const { setModal } = useApp();
  const close = () => setModal(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setModal(null);
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [setModal]);

  return (
    <div className="ov" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="mh">
          <span className="card__icon"><Icon size={22} /></span>
          <h2>{title}</h2>
          <button className="x" onClick={close} aria-label="Close" autoFocus><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
