import { useEffect, useState } from "react";
import OBR, { isImage } from "@owlbear-rodeo/sdk";
import getPluginId from "../lib/getPluginId";
import HealthTrackerItem from "./HealthTrackerItem";
import { isMetadata } from "../lib/typeValidators";
// import { setupContextMenu } from '../lib/contextMenu';


export default function HealthTracker() {
  const [healthItems, setHealthItems] = useState([]);

  useEffect(() => {
    const handleItemsChange = async (items) => {
      const healthItems = [];
      for (const item of items) {
        console.log(item);
        if (isImage(item)) {
          const metadata = item.metadata[getPluginId('metadata')];

          if (isMetadata(metadata)) {
            healthItems.push(
              <HealthTrackerItem
                key={`health-${item.id}`}
                id={item.id}
                name={item.text.plainText || item.name}
                health={metadata.health}
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