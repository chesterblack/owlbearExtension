import OBR from "@owlbear-rodeo/sdk";

const ID = "com.tutorial.health-tracker";

export function setupHealthList(element) {
  const renderList = (items) => {
    console.log(items);
    // Get the name and health of any item with
    // our health metadata
    const healthItems = [];
    for (const item of items) {
      const metadata = item.metadata[`${ID}/metadata`];
      if (metadata) {
        const itemName = item.text.plainText !== "" ? item.text.plainText : item.name;

        healthItems.push({
          id: item.id,
          health: metadata.health,
          name: itemName,
        });
      }
    }

    // Create new list nodes for each health item
    const nodes = [];
    for (const healthItem of healthItems) {

      const container = document.createElement('div');
      container.classList.add('health-item');

      const label = document.createElement('span');
      label.innerHTML = `${healthItem.name}`;

      const input = document.createElement("input");
      input.innerHTML = `${healthItem.name}: ${healthItem.health}`;
      input.value = healthItem.health;
      input.type = "number";
      input.addEventListener("change", (e) => {
        OBR.scene.items.updateItems(items, (items) => {
          for (let item of items) {
            if (healthItem.id === item.id) {
              item.metadata[`${ID}/metadata`].health = e.target.value;
            }
          }
        })
      });

      const increment = document.createElement('button');
      increment.classList.add('increment');
      increment.innerHTML = "+";
      increment.addEventListener("click", () => {
        OBR.scene.items.updateItems(items, (items) => {
          for (let item of items) {
            if (healthItem.id === item.id) {
              item.metadata[`${ID}/metadata`].health++;
            }
          }
        })
      });

      const decrement = document.createElement('button');
      decrement.classList.add('decrement');
      decrement.innerHTML = "-";
      decrement.addEventListener("click", () => {
        OBR.scene.items.updateItems(items, (items) => {
          for (let item of items) {
            if (healthItem.id === item.id) {
              item.metadata[`${ID}/metadata`].health--;
            }
          }
        })
      });

      const inputWrapper = document.createElement('div');
      inputWrapper.classList.add('input-wrapper')
      inputWrapper.appendChild(input);
      inputWrapper.appendChild(increment);
      inputWrapper.appendChild(decrement);

      container.appendChild(label);
      container.appendChild(inputWrapper);

      nodes.push(container);
    }

    element.replaceChildren(...nodes);
  };
  OBR.scene.items.onChange(renderList);
}