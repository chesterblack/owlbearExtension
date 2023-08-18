import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import ButtonIncrement from "./ButtonIncrement";
import ButtonDecrement from "./ButtonDecrement";
import getPluginId from "../lib/getPluginId";
import HealthInput from "./HealthInput";
import DamageInput from "./DamageInput";
import HealthDescInput from "./HealthDescInput";

export default function HealthTrackerItem({ id, name, health, healthDescription }) {
  const [currentHealth, setCurrentHealth] = useState(health);
  const [currentDescription, setCurrentDescription] = useState(healthDescription);
  const [damage, setDamage] = useState(0);

  useEffect(() => {
    (async () => {
      if (currentHealth < 1) {
        setCurrentDescription("Dead");
      }

      const items = await OBR.scene.items.getItems();
      OBR.scene.items.updateItems(items, (items) => {
        for (let item of items) {
          if (id === item.id) {
            item.metadata[getPluginId('metadata')] = {
              health: parseInt(currentHealth),
              healthDescription: currentHealth < 1 ? "Dead" : currentDescription,
            }
          }
        }
      });
    })();
  }, [currentHealth, currentDescription, id]);

  return (
    <>
      <div className="health-item">
        <span className="item-label">{name}</span>
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
      <HealthDescInput
        currentDescription={currentDescription}
        setCurrentDescription={setCurrentDescription}
      />
    </>
  );
}