export default function ObfuscatedHealthTrackerItem({ name, healthDescription }) {
  return (
    <div className="health-item">
      <span>{name}</span>
      <span>{healthDescription}</span>
    </div>
  );
}