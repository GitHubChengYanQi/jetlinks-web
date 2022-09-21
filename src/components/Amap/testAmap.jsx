import React from 'react';
import {Map, Markers} from 'react-amap';

const randomPosition = () => ({
  longitude: 100 + Math.random() * 20,
  latitude: 30 + Math.random() * 20
});
const randomMarker = () => (
  Array(100).fill(true).map((e, idx) => ({
    position: randomPosition()
  }))
);
const TestAmap = () => {
  console.log(randomMarker());
  return <div>
    <div style={{width: '100%', height: 372}}>
      <Map center={randomPosition()} zoom={6}>
        <Markers
          markers={randomMarker()}
        />
      </Map>
    </div>
  </div>;
};

export default TestAmap;
