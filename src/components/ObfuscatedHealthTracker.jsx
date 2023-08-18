import { useEffect, useState } from "react";
import OBR, { isImage } from "@owlbear-rodeo/sdk";
import getPluginId from "../lib/getPluginId";
import ObfuscatedHealthTrackerItem from "./ObfuscatedHealthTrackerItem";
import { isMetadata } from "../lib/typeValidators";

export default function ObfuscatedHealthTracker() {
  const [healthItems, setHealthItems] = useState([]);

  useEffect(() => {
    const handleItemsChange = async (items) => {
      const healthItems = [];
      for (const item of items) {
        if (isImage(item)) {
          const metadata = item.metadata[getPluginId('metadata')];

          if (isMetadata(metadata)) {
            healthItems.push(
              <ObfuscatedHealthTrackerItem
                key={`health-${item.id}`}
                id={item.id}
                name={item.text.plainText || item.name}
                healthDescription={metadata.healthDescription}
                visible={item.visible}
              />
            );
          }
        }
      }

      setHealthItems(healthItems);
    };

    OBR.scene.items.getItems().then(handleItemsChange);
    return OBR.scene.items.onChange(handleItemsChange);
  }, []);

  return (
    <div className="health-tracker">
      <h1>Health Tracker</h1>
      {healthItems}
    </div>
  );
}