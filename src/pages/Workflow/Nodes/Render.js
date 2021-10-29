import React from 'react';
// eslint-disable-next-line import/no-cycle
import MatchNode from './MatchNode';

function Render({config, pRef}) {
  return (
    <React.Fragment>
      <MatchNode pRef={pRef} config={config} />
      {config.childNode && <Render pRef={config} config={config.childNode} />}
    </React.Fragment>
  );
}

export default Render;
