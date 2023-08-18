import OBR from "@owlbear-rodeo/sdk";
import getPluginId from "./getPluginId";

export function setupContextMenu() {
  console.log('context setup');
  OBR.contextMenu.create({
    id: getPluginId('context-menu'),
    icons: [
      {
        icon: "/add.svg",
        label: "Add to Health Tracker",
        filter: {
          every: [
            { key: "layer", value: "CHARACTER" },
            { key: ["metadata", getPluginId('metadata')], value: undefined },
          ],
        },
      },
      {
        icon: "/remove.svg",
        label: "Remove from Health Tracker",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(context) {
      const addToHealth = context.items.every((item) => {
        return item.metadata[getPluginId('metadata')] === undefined;
      });

      if (addToHealth) {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            item.metadata[getPluginId('metadata')] = {
              health: 0,
            };
          }
        });
      } else {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            delete item.metadata[getPluginId('metadata')];
          }
        });
      }
    },
  });
}