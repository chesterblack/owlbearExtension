import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";
import { setupHealthList } from "./healthList";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Health Tracker</h1>
    <div id="health-list"></div>
  </div>
`;

OBR.onReady(() => {
  setupContextMenu();
  setupHealthList(document.querySelector("#health-list"));
});