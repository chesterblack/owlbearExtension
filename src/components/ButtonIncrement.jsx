export default function ButtonIncrement({ currentHealth, setCurrentHealth }) {
  return (
    <button className="increment" onClick={() => {
      setCurrentHealth(parseInt(currentHealth) + 1);
    }}>+</button>
  );
}