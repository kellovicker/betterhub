export default function StatusBadge({ status }) {
  return status === "active"
    ? <span className="badge badge--active">Active</span>
    : <span className="badge badge--out">Out of Stock</span>;
}
