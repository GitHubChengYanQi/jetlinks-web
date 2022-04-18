import React from 'react';

const CssPennants = ({value, width = 50, startColor, endColor,color}) => {

  const height = width;

  return <div style={{backgroundImage: `linear-gradient(${startColor}, ${endColor})`}}>
    <div style={{
      height,
    }}>
      <div
        style={{
          color: color || '#fff',
          fontWeight:600,
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >{value || 1}</div>
    </div>
    <div style={{lineHeight: 0}}>
      <div
        style={{
          height: 0,
          width: 0,
          display: 'inline-block',
          borderTop: `solid ${width / 2}px rgba(0, 0, 0, 0)`,
          borderRight: `solid ${width / 2}px #fff`,
        }}
      />
      <div
        style={{
          height: 0,
          width: 0,
          display: 'inline-block',
          borderTop: `solid ${width / 2}px rgba(0, 0, 0, 0)`,
          borderLeft: `solid ${width / 2}px #fff`,
        }}/>
    </div>
  </div>;
};

export default CssPennants;
