import { useEffect, useState } from "react";
import ButtonIncrement from "./ButtonIncrement";
import ButtonDecrement from "./ButtonDecrement";
import OBR from "@owlbear-rodeo/sdk";
import getPluginId from "../lib/getPluginId";

export default function HealthTrackerItem({ id, name, health }) {
  const [currentHealth, setCurrentHealth] = useState(health);

  useEffect(() => {
    (async () => {
      const items = await OBR.scene.items.getItems();
      OBR.scene.items.updateItems(items, (items) => {
        for (let item of items) {
          if (id === item.id) {
            item.metadata[getPluginId('metadata')].health = parseInt(currentHealth);
          }
        }
      })
    })();
  }, [currentHealth, id])

  return (
    <div className="health-item">
      <span>{name}</span>
      <div className="input-wrapper">
        <input
          type="number"
          value={currentHealth}
          onChange={(e) => {
            setCurrentHealth(e.target.value);
          }}
        />
        <ButtonIncrement
          currentHealth={currentHealth}
          setCurrentHealth={setCurrentHealth}
        />
        <ButtonDecrement 
          currentHealth={currentHealth}
          setCurrentHealth={setCurrentHealth}
        />
      </div>
    </div>
  );
}