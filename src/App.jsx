import './App.css'
import OBR from "@owlbear-rodeo/sdk";
import HealthTracker from './components/HealthTracker'
import { setupContextMenu } from './lib/contextMenu';
import { useEffect, useState } from 'react';

function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [isDM, setIsDM] = useState(false);
  
  useEffect(() => {
    OBR.scene.isReady().then(setSceneReady);
    return OBR.scene.onReadyChange(setSceneReady);
  }, []);

  useEffect(() => {
    console.log('checking role')
    OBR.player.getRole().then((role) => {
      console.log(role);
      setIsDM(role === "GM");
    });
  }, []);

  useEffect(() => {
    setupContextMenu();
  }, []);

  if (sceneReady) {
    if (isDM) {
      return <HealthTracker />;
    } else {
      return (
        <>
          <h1>Health Tracker</h1>
          <p>Sorry, only the DM can see this...</p>
        </>
      );
    }
  } else {
    // Show a basic header when the scene isn't ready
    return <h1>Just a mo...</h1>;
  }
}

export default App
