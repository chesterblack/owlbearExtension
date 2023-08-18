export default function HealthInput({ currentHealth, setCurrentHealth }) {
  return (
    <input
      type="number"
      value={currentHealth}
      onChange={(e) => {
        setCurrentHealth(e.target.value);
      }}
    />
  );
}