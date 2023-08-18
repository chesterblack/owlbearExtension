import './App.css'
import OBR from "@owlbear-rodeo/sdk";
import HealthTracker from './components/HealthTracker'
import { setupContextMenu } from './lib/contextMenu';
import { useEffect, useState } from 'react';

function App() {
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    OBR.scene.isReady().then(setSceneReady);
    return OBR.scene.onReadyChange(setSceneReady);
  }, []);

  useEffect(() => {
    setupContextMenu();
  }, []);

  if (sceneReady) {
    return <HealthTracker />;
  } else {
    // Show a basic header when the scene isn't ready
    return (
      <>Just a mo...</>
    );
  }
}

export default App
