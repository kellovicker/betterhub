import { useApp } from "../context/AppContext.jsx";
import ServiceModal from "./ServiceModal.jsx";
import FundModal from "./FundModal.jsx";
import Panel from "./Panel.jsx";

export default function ModalHost() {
  const { modal, toastMsg } = useApp();
  return (
    <>
      {modal?.type === "svc" && <ServiceModal key={modal.n} n={modal.n} />}
      {modal?.type === "fund" && <FundModal />}
      {modal?.type === "panel" && <Panel key={modal.k} k={modal.k} />}
      <div className={"toast" + (toastMsg ? " show" : "")} role="status">{toastMsg}</div>
    </>
  );
}
