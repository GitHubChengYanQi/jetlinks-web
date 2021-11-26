import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import NodeWrap from '../NodeWrap';
import WFC from '@/pages/Workflow/OperatorContext';
import {Typography} from 'antd';


function getOwner(props) {

  if (props.auditRule && props.auditRule.startUsers) {
    return <>
      <strong>发起人</strong>
      {props.auditRule.startUsers.users && props.auditRule.startUsers.users.length > 0 &&
      <Typography.Paragraph ellipsis style={{marginBottom: 0}}>
        <strong>人员:</strong>
        {(props.auditRule.startUsers.users.map((item) => {
          return item.title;
        })).toString()}
      </Typography.Paragraph>}
      {props.auditRule.startUsers.depts && props.auditRule.startUsers.depts.length > 0 &&
      <Typography.Paragraph ellipsis style={{marginBottom: 0}}>
        <strong>部门:</strong>
        {(props.auditRule.startUsers.depts.map((item) => {
          return item.title;
        })).toString()}
      </Typography.Paragraph>}
      {
        props.auditRule.startUsers.supervisor && <div>
          <strong>直接主管</strong>
        </div>
      }
    </>;
  } else {
    return null;
  }
}


function StartNode(props) {

  const {onDeleteNode, onSelectNode} = useContext(WFC);

  function onContentClick() {
    onSelectNode(props.pRef, props.objRef);
    props.onContentClick && props.onContentClick();
  }

  return (
    <NodeWrap
      type={0}
      objRef={props.objRef}
      onContentClick={()=>{onContentClick();}}
      title={<span>{props.nodeName || '发起人'}</span>}>
      <div>
        {props.stepType ? getOwner(props) : '请选择发起人'}
      </div>
      <Icon type="icon-arrow-right" />
    </NodeWrap>);
}

export default StartNode;
