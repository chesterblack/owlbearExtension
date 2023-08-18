export default function DamageInput({ damage, onDamageChange }) {
  return (
    <input
      type="number"
      value={damage}
      onChange={onDamageChange}
    />
  );
}