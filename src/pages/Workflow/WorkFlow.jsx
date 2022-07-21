import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import EndNode from './Nodes/EndNode';
import Render from './Nodes/Render';
import {OptionTypes, NodeTemplates, NodeTypes} from './Nodes/Constants';
import WFC from './OperatorContext';
import ZoomLayout from './Nodes/ZoomLayout';
import styles from './index.module.scss';
import Audit from '@/pages/Workflow/components/Audit';


const WorkFlow = ({value, onChange, type, module}) => {

  const ref = useRef();

  const defaultConfig = {
    'pkId': 'start',
    'nodeName': '发起人',
    'stepType': 'start',
    'auditType': 'start',
    'type': '0',
    'childNode': null,  // 下级步骤
    'conditionNodeList': [] // 分支
  };

  const [config, setConfig] = useState(value || defaultConfig);

  const [currentNode, setCurrentNode] = useState();

  const updateNode = () => {
    typeof onChange === 'function' && onChange({...config});
    setConfig({...config});
  };

  // let currentNode = null;

  // 链表操作: 几种行为， 添加行为，删除行为，点击行为     pRef.childNode -> objRef.childNode -> 后继
  // 添加节点

  const onAddNode = (type, pRef, objRef) => {

    const o = objRef.childNode;

    if (type === OptionTypes.APPROVER) {
      objRef.childNode = {...NodeTemplates[OptionTypes.APPROVER], childNode: o, auditType: 'process',};
    }
    if (type === OptionTypes.NOTIFIER) {
      objRef.childNode = {
        ...NodeTemplates[OptionTypes.NOTIFIER],
        childNode: o,
        stepType: 'send',
        auditType: 'send',
      };
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
  };

  // 删除节点
  const onDeleteNode = (pRef, objRef, type, index) => {
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
  };


  // 获取节点
  const onSelectNode = (pRef, objRef) => {
    setCurrentNode({
      current: objRef,
      prev: pRef
    });

    ref.current.refType(objRef.type);
  };

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
            onContentClick={() => {
            }}
          />
          <EndNode />
        </ZoomLayout>
      </section>

      <Audit
        ref={ref}
        type={type}
        module={module}
        currentNode={currentNode}
        updateNode={() => {
          updateNode();
        }}
      />

    </WFC.Provider>
  );
};

export default WorkFlow;
