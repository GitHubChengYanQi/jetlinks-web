import React from 'react';
import AddNodeOption from '../AddNodeOption';
import {OptionNames, OptionTypes} from '../Constants';
import styles from './index.module.scss';

function AddNodeList(props) {
  return (<div className={styles.addNodePopoverBody}>
    <AddNodeOption type="approver" onClick={() => props.onOptionClick(OptionTypes.APPROVER)} name={OptionNames[OptionTypes.APPROVER]} />
    <AddNodeOption type="notifier" onClick={() => props.onOptionClick(OptionTypes.NOTIFIER)} name={OptionNames[OptionTypes.NOTIFIER]} />
    <AddNodeOption type="condition" onClick={() => props.onOptionClick(OptionTypes.CONDITION)} name={OptionNames[OptionTypes.CONDITION]} />
  </div>);
}

export default AddNodeList;
