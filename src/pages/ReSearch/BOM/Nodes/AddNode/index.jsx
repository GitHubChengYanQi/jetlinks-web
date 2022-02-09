import React, {useState, useContext} from 'react';
import {Popover} from 'antd';
import Icon from '@/components/Icon';
import AddNodeList from '../AddNodeList';
import WFC from '../../OperatorContext';
import styles from './index.module.scss';


const AddNode = (props) => {

  const {onAddNode} = useContext(WFC);

  function onOptionClick(type) {
    onAddNode(type, props.pRef, props.objRef);
  }

  return (<div className={styles.addNodeBtnBox}>
    <div className="add-node-btn">
      <Popover placement="bottom" content={<AddNodeList onOptionClick={onOptionClick} />} trigger="click">
        <div className="btn">
          <Icon type="icon-add1" />
        </div>
      </Popover>
    </div>
  </div>);
};

export default AddNode;
