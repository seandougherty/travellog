import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntries} from './api';


function App() {
  const [logEntries, setLogentries] = useState([ ])
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 52.355518,
    longitude: -1.174320,
    zoom: 5
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogentries(logEntries);
    })()

  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={ setViewport()}
      
    >
      {
        logEntries.map(entry => (
        
          <Marker 
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-20} 
            offsetTop={-10}>
              <div>{entry.title}</div>
          </Marker>
        
        ))
      }
      </ReactMapGL>
  );

}

export default App;
