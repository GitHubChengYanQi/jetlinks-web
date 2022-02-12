import React from 'react';
import Icon from '@/components/Icon';

function AddNodeOption(props) {
  return (<a className={"add-node-popover-item "+ props.type} onClick={props.onClick}>
    <div className="item-wrapper">
      <Icon type="icon-7" />
    </div>
    <p>{props.name}</p>
  </a>);
}


export default AddNodeOption;
