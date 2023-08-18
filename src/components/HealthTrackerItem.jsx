import { useEffect, useState } from "react";
import ButtonIncrement from "./ButtonIncrement";
import ButtonDecrement from "./ButtonDecrement";
import OBR from "@owlbear-rodeo/sdk";
import getPluginId from "../lib/getPluginId";
import HealthInput from "./HealthInput";
import DamageInput from "./DamageInput";

export default function HealthTrackerItem({ id, name, health }) {
  const [currentHealth, setCurrentHealth] = useState(health);
  const [damage, setDamage] = useState(0);

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
  }, [currentHealth, id]);

  return (
    <div className="health-item">
      <span>{name}</span>
      <div className="input-wrapper">
        <HealthInput
          currentHealth={currentHealth}
          setCurrentHealth={setCurrentHealth}
        />
        <div className="damage-wrapper">
          <DamageInput
            damage={damage}
            onDamageChange={(e) => {setDamage(e.target.value)}}
          />
          <div className="buttons-wrapper">
            <ButtonIncrement
              damage={damage}
              currentHealth={currentHealth}
              setCurrentHealth={setCurrentHealth}
              />
            <ButtonDecrement 
              damage={damage}
              currentHealth={currentHealth}
              setCurrentHealth={setCurrentHealth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}