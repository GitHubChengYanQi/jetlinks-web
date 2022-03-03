import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import Drawer from '@/components/Drawer';
import EndNode from './Nodes/EndNode';
import Render from './Nodes/Render';
import {OptionTypes, NodeTemplates, NodeTypes} from './Nodes/Constants';
import WFC from './OperatorContext';
import ZoomLayout from './Nodes/ZoomLayout';
import Setps from './Nodes/Setps';
import styles from './index.module.scss';
import AddProcess from '@/pages/ReSearch/BOM/components/AddProcess';


const WorkFlow = ({value, onChange, skuId, type, module}) => {

  const ref = useRef();

  const refStart = useRef();

  const defaultConfig = {
    'pkId': 'start',
    'nodeName': '生产产品1',
    'type': '0',
    'childNode': null,  // 下级步骤
    'conditionNodeList': [], // 分支
    processRoute: {
      skuId
    }
  };

  const [config, setConfig] = useState(value || defaultConfig);

  const [currentNode, setCurrentNode] = useState({});

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
        ...NodeTemplates[OptionTypes.CONDITION],
        conditionNodeList: [
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

    switch (objRef.type) {
      case '0':
        refStart.current.open(false);
        break;
      case '1':
      case '3':
        ref.current.open(true);
        break;
      default:
        break;
    }

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
          <Render
            config={config}
          />
          <EndNode />
        </ZoomLayout>
      </section>
      <Drawer push={false} headTitle="步骤设置" ref={ref} width={850}>
        <Setps
          type={type}
          module={module}
          value={currentNode.current && currentNode.current.setpSet}
          onChange={(value) => {
            currentNode.current.setpSet = value;
            currentNode.current.stepType = value.type;
            ref.current.close();
            updateNode();
          }}
          onClose={() => {
            ref.current.close();
          }}
        />
      </Drawer>

      <Drawer headTitle="生产产品" ref={refStart} width={800}>
        <AddProcess
          onClose={() => {
            refStart.current.close();
          }}
          value={currentNode.current && currentNode.current.processRoute}
          onChange={(value) => {
            currentNode.current.processRoute = value;
            currentNode.current.stepType = 'shipStart';
            refStart.current.close();
            updateNode();
          }}
        />
      </Drawer>
    </WFC.Provider>
  );
};

export default WorkFlow;
