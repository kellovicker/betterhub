import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import BottomNav from "./BottomNav.jsx";
import ModalHost from "./ModalHost.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Layout() {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="app">
      <Header />
      <main className="page"><Outlet /></main>
      <BottomNav />
      <ModalHost />
    </div>
  );
}
