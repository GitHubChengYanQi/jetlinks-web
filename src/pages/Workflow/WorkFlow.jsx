import React, {useEffect, useRef, useState} from 'react';
import Drawer from '@/components/Drawer';
import EndNode from './Nodes/EndNode';
import Render from './Nodes/Render';
import {OptionTypes, NodeTemplates, NodeTypes} from './Nodes/Constants';
import WFC from './OperatorContext';
import ZoomLayout from './Nodes/ZoomLayout';
import Setps from './Nodes/Setps';
import styles from './index.module.scss';
import UserTree from '@/pages/Workflow/Nodes/UserTree';
import Originator from '@/pages/Workflow/Nodes/Originator';
import {Modal} from 'antd';
import Branchs from '@/pages/Workflow/Nodes/Branchs';


const WorkFlow = ({config: _config, value, onChange, type, module}) => {

  const ref = useRef();
  const refStart = useRef();
  const refBranch = useRef();

  const defaultConfig = {
    'pkId': 'start',
    'nodeName': '发起人',
    'type': '0',
    'childNode': null,  // 下级步骤
    'conditionNodeList': [] // 分支
  };

  const [config, setConfig] = useState(value || defaultConfig);

  const [currentNode, setCurrentNode] = useState();

  function updateNode() {
    typeof onChange === 'function' && onChange({...config});
    setConfig({...config});
  }

  // let currentNode = null;

  // 链表操作: 几种行为， 添加行为，删除行为，点击行为     pRef.childNode -> objRef.childNode -> 后继
  // 添加节点

  function onAddNode(type, pRef, objRef) {

    const o = objRef.childNode;

    if (type === OptionTypes.APPROVER) {
      objRef.childNode = {...NodeTemplates[OptionTypes.APPROVER], childNode: o};
    }
    if (type === OptionTypes.NOTIFIER) {
      objRef.childNode = {...NodeTemplates[OptionTypes.NOTIFIER], childNode: o};
    }
    if (type === OptionTypes.CONDITION) {
      objRef.childNode = {
        ...NodeTemplates[OptionTypes.CONDITION], conditionNodeList: [
          {
            ...NodeTemplates[OptionTypes.BRANCH],
            nodeName: '条件1',
            auditType: 'branch',
            stepType: 'branch',
            childNode: o
          },
          {...NodeTemplates[OptionTypes.BRANCH], nodeName: '条件2', auditType: 'branch', stepType: 'branch',},
        ]
      };
    }
    if (type === OptionTypes.BRANCH) {
      objRef.conditionNodeList.push({...NodeTemplates[NodeTypes.BRANCH], auditType: 'branch', stepType: 'branch'});
    }
    updateNode();
  }

  // 删除节点
  function onDeleteNode(pRef, objRef, type, index) {
    Modal.confirm({
      centered: true,
      title: '是否删除节点?',
      onOk: () => {
        if (type === NodeTypes.BRANCH) {
          objRef.conditionNodeList.splice(index, 1);
        } else {
          const newObj = objRef.childNode;
          pRef.childNode = newObj;
        }
        updateNode();
      }
    });
  }


  // 获取节点
  function onSelectNode(pRef, objRef) {
    setCurrentNode({
      current: objRef,
      prev: pRef
    });

    if (objRef.type === '0' || objRef.type === '2')
      refStart.current.open(true);
    else if (objRef.type === '3') {
      switch (type) {
        case 'purchase':
          switch (module) {
            case 'purchaseAsk':
              refBranch.current.open(true);
              break;
            case 'purchasePlan':
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else
      ref.current.open(true);
  }

  useEffect(() => {
    if (value) {
      setConfig({...value});
    }
  }, [value]);

  return (
    <WFC.Provider value={{config, updateNode, onAddNode, onDeleteNode, onSelectNode}}>
      <section className={styles.dingflowDesign}>
        <ZoomLayout>
          <Render config={config} onContentClick={() => {
            console.log(1111);
          }} />
          <EndNode />
        </ZoomLayout>
      </section>
      <Drawer title="步骤设置" ref={ref} width={800}>
        <Setps
          type={type}
          module={module}
          value={currentNode && currentNode.current && {
            type: currentNode.current.stepType,
            auditRule: currentNode.current.auditRule && currentNode.current.auditRule.rules,
            action: currentNode.current.auditRule && currentNode.current.auditRule.type,
          }}
          onChange={(value) => {
            switch (value.type) {
              case 'audit':
                currentNode.current.auditRule = {type: 'audit', rules: value.auditRule};
                break;
              case 'quality':
                currentNode.current.auditRule = {type: value.quality_action, rules: value.actionRule};
                break;
              case 'purchase':
                currentNode.current.auditRule = {type: value.purchase_action};
                break;
              default:
                break;
            }
            currentNode.current.stepType = value.type;
            currentNode.current.auditType = 'process';
            ref.current.close();
            updateNode();
          }}
          onClose={() => {
            ref.current.close();
          }}
        />
      </Drawer>
      <Drawer title="发起人设置" ref={refStart} width={800}>
        <Originator
          value={currentNode && currentNode.current && currentNode.current.auditRule && currentNode.current.auditRule.rules}
          onChange={(value) => {
            switch (currentNode.current.type) {
              case '0':
                currentNode.current.auditRule = {type: 'start', rules: value};
                currentNode.current.stepType = 'start';
                currentNode.current.auditType = 'start';
                break;
              case '2':
                currentNode.current.auditRule = {type: 'send', rules: value};
                currentNode.current.stepType = 'send';
                currentNode.current.auditType = 'send';
                break;
              default:
                break;
            }
            updateNode();
            refStart.current.close();
          }} />
      </Drawer>
      <Drawer title="条件设置" ref={refBranch} width={800}>
        <Branchs
          value={currentNode && currentNode.current && currentNode.current.auditRule && currentNode.current.auditRule.rules}
          onChange={(value) => {
            currentNode.current.auditRule = {type: 'purchaseAsk', rules: value};
            currentNode.current.stepType = 'branch';
            currentNode.current.auditType = 'branch';
            updateNode();
            refBranch.current.close();
          }} />
      </Drawer>
    </WFC.Provider>
  );
};

export default WorkFlow;
