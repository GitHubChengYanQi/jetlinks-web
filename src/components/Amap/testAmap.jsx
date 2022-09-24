import React from 'react';
import {Map, Markers} from 'react-amap';

const TestAmap = () => {
  return <div>
    <div style={{width: '100%', height: '100vh'}}>
      <Map center={{longitude:123.39285,latitude:41.795092,}} zoom={16}>
        <Markers
          markers={[
            {position:{longitude:123.39285,latitude:41.795092,}}
          ]}
        />
      </Map>
    </div>
  </div>;
};

export default TestAmap;
