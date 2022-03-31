import React from "react";
import styles from "@/pages/Test/MaterialAnalysis/index.module.less";

const CssPennants = ({value, width = 50, color}) => {

  const height = width;

  return <div>
    <div style={{
      height
    }}>
      <div
        className={styles.topBlock}
        style={{
          textAlign: 'center',
          color: '#fff',
          backgroundColor: color || '#feb042',
          width,
          height,
          display: 'inline-block',
        }}
      >{value || 1}</div>
    </div>
    <div style={{lineHeight: 0}}>
      <div
        style={{
          height: 0,
          width: 0,
          display: 'inline-block',
          borderTop: `solid ${width / 2}px ${color || '#feb042'}`,
          borderRight: `solid ${width / 2}px rgba(0, 0, 0, 0)`,
        }}
      />
      <div
        style={{
          height: 0,
          width: 0,
          display: 'inline-block',
          borderTop: `solid ${width / 2}px ${color || '#feb042'}`,
          borderLeft: `solid ${width / 2}px rgba(0, 0, 0, 0)`,
        }}/>
    </div>
  </div>;
};

export default CssPennants;
