export default function ButtonDecrement({ damage, currentHealth, setCurrentHealth }) {
  return (
    <button className="decrement" onClick={() => {
      setCurrentHealth(parseInt(currentHealth) - parseInt(damage));
    }}>-</button>
  );
}