import React from 'react';
// eslint-disable-next-line import/no-cycle
import MatchNode from './MatchNode';

function Render({config, pRef}) {
  console.log(config);
  return (
    <React.Fragment>
      <MatchNode pRef={pRef} config={config} />
      {config.childNode && <Render pRef={config} config={config.childNode} />}
      {config.luYou && <Render pRef={config} config={config.luYou} />}
    </React.Fragment>
  );
}

export default Render;
