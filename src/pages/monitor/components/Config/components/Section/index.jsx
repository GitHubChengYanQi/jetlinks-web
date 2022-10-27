import React, {useState} from 'react';
import {Input, InputNumber} from 'antd';
import styles from '@/pages/monitor/components/Config/index.module.less';

const Section = ({
  value = [],
  onChange = () => {
  },
}) => {

  const [section, setSection] = useState(value || []);

  const sectionChange = (newSection) => {
    setSection(newSection);
    onChange(newSection);
  };

  return <Input.Group compact>
    <InputNumber
      value={section[0]}
      style={{width: 100, textAlign: 'center'}}
      placeholder="最小值"
      onChange={(value) => {
        sectionChange([value || 0, section[1] || 0]);
      }}
    />
    <Input
      className={styles.leftInput}
      style={{
        width: 30,
        borderLeft: 0,
        borderRight: 0,
        pointerEvents: 'none',
      }}
      placeholder="———"
      disabled
    />
    <InputNumber
      min={section[0] + 1}
      value={section[1]}
      className={styles.rightInput}
      style={{
        width: 100,
        textAlign: 'center',
      }}
      placeholder="最大值"
      onChange={(value) => {
        sectionChange([section[0] || 0, value || 0]);
      }}
    />
  </Input.Group>;
};

export default Section;
