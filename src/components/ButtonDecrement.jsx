export default function ButtonDecrement({ currentHealth, setCurrentHealth }) {
  return (
    <button className="decrement" onClick={() => {
      setCurrentHealth(parseInt(currentHealth) - 1);
    }}>-</button>
  );
}