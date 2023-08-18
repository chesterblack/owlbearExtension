export default function HealthDescInput({ currentDescription, setCurrentDescription }) {
  return (
    <input
      className="health-description"
      placeholder="Rough description"
      type="text"
      value={currentDescription}
      onChange={(e) => {
        setCurrentDescription(e.target.value);
      }}
    />
  );
}