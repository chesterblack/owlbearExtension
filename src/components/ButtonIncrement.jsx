export default function ButtonIncrement({ damage, currentHealth, setCurrentHealth }) {
  return (
    <button className="increment" onClick={() => {
      setCurrentHealth(parseInt(currentHealth) + parseInt(damage));
    }}>+</button>
  );
}