import WalletCard from "../components/WalletCard.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import { services } from "../data/services.js";
import { useApp } from "../context/AppContext.jsx";

export default function Home() {
  const { user, setModal } = useApp();
  return (
    <>
      <p className="greeting">Welcome back <strong>{user.name}</strong></p>
      <WalletCard />
      <h2 className="section-title">Quick Services</h2>
      <div className="tile-grid">
        {services.map(({ id, short, icon: Icon }, n) => (
          <button key={id} className="tile" onClick={() => setModal({ type: "svc", n })}>
            <Icon size={24} />{short}
          </button>
        ))}
      </div>
      <FeaturedCarousel />
    </>
  );
}
