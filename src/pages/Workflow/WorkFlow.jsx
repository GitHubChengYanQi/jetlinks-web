import React, {useRef, useState} from 'react';
import Drawer from '@/components/Drawer';
import EndNode from './Nodes/EndNode';
import Render from './Nodes/Render';
import {OptionTypes, NodeTemplates, NodeTypes} from './Nodes/Constants';
import WFC from './OperatorContext';
import ZoomLayout from './Nodes/ZoomLayout';
import Setps from './Nodes/Setps';
import styles from './index.module.scss';



const $config = {
  "code": "200",
  "msg": "success",
  "data": {
    "tableId": 1,
    "workFlowVersionId": "",
    "workFlowDef": {
      "name": "合同审批",
      "publicFlag": 1,
      "sortNo": 5,
      "duplicateRemovelFlag": 1,
      "optionTip": "",
      "optionNotNull": 0,
      "status": 1
    },
    "directorMaxLevel": 4,
    "flowPermission": [],
    "nodeConfig": {
      "pkId": "sid-start-node",
      "nodeName": "发起人",
      "type": 0,
      "priorityLevel": "",
      "settype": "",
      "selectMode": "",
      "selectRange": "",
      "examineRoleId": "",
      "directorLevel": "",
      "replaceByUp": "",
      "examineMode": "",
      "noHanderAction": "",
      "examineEndType": "",
      "examineEndRoleId": "",
      "examineEndDirectorLevel": "",
      "ccSelfSelectFlag": "",
      "conditionList": [],
      "nodeUserList": [],
      "childNode": {
        "nodeName": "审核",
        "error": false,
        "type": 1,
        "settype": 2,
        "selectMode": 0,
        "selectRange": 0,
        "directorLevel": 1,
        "replaceByUp": 0,
        "examineMode": 1,
        "noHanderAction": 2,
        "examineEndDirectorLevel": 0,
        "childNode": {
          "nodeName": "路由",
          "type": 4,
          "priorityLevel": 1,
          "settype": 1,
          "selectMode": 0,
          "selectRange": 0,
          "examineRoleId": 0,
          "directorLevel": 1,
          "replaceByUp": 0,
          "examineMode": 1,
          "noHanderAction": 2,
          "examineEndType": 0,
          "examineEndRoleId": 0,
          "examineEndDirectorLevel": 1,
          "ccSelfSelectFlag": 1,
          "conditionList": [],
          "nodeUserList": [],
          "childNode": {
            "nodeName": "抄送人",
            "type": 2,
            "ccSelfSelectFlag": 1,
            "childNode": null,
            "nodeUserList": [],
            "error": false
          },
          "conditionNodes": [{
            "nodeName": "条件1",
            "type": 3,
            "priorityLevel": 1,
            "settype": 1,
            "selectMode": 0,
            "selectRange": 0,
            "examineRoleId": 0,
            "directorLevel": 1,
            "replaceByUp": 0,
            "examineMode": 1,
            "noHanderAction": 2,
            "examineEndType": 0,
            "examineEndRoleId": 0,
            "examineEndDirectorLevel": 1,
            "ccSelfSelectFlag": 1,
            "conditionList": [{
              "columnId": 0,
              "type": 1,
              "conditionEn": "",
              "conditionCn": "",
              "optType": "",
              "zdy1": "",
              "zdy2": "",
              "opt1": "",
              "opt2": "",
              "columnDbname": "",
              "columnType": "",
              "showType": "",
              "showName": "",
              "fixedDownBoxValue": ""
            }],
            "nodeUserList": [{
              "targetId": 85,
              "type": 1,
              "name": "天旭"
            }],
            "childNode": {
              "nodeName": "审核",
              "type": 1,
              "priorityLevel": 1,
              "settype": 1,
              "selectMode": 0,
              "selectRange": 0,
              "examineRoleId": 0,
              "directorLevel": 1,
              "replaceByUp": 0,
              "examineMode": 1,
              "noHanderAction": 2,
              "examineEndType": 0,
              "examineEndRoleId": 0,
              "examineEndDirectorLevel": 1,
              "ccSelfSelectFlag": 1,
              "conditionList": [],
              "nodeUserList": [{
                "targetId": 2515744,
                "type": 1,
                "name": "哈哈哈哈"
              }],
              "childNode": null,
              "conditionNodes": [],
              "error": false
            },
            "conditionNodes": [],
            "error": false
          }, {
            "nodeName": "条件2",
            "type": 3,
            "priorityLevel": 2,
            "settype": 1,
            "selectMode": 0,
            "selectRange": 0,
            "examineRoleId": 0,
            "directorLevel": 1,
            "replaceByUp": 0,
            "examineMode": 1,
            "noHanderAction": 2,
            "examineEndType": 0,
            "examineEndRoleId": 0,
            "examineEndDirectorLevel": 1,
            "ccSelfSelectFlag": 1,
            "conditionList": [],
            "nodeUserList": [],
            "childNode": null,
            "conditionNodes": [],
            "error": false
          }]
        },
        "nodeUserList": []
      },
      "conditionNodes": []
    }
  }
};

const WorkFlow = ({config: _config}) => {

  const ref = useRef();

  const [config, setConfig] = useState($config.data.nodeConfig);

  function updateNode() {
    setConfig({...config});
  }

  let currentNode = null;

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
        ...NodeTemplates[OptionTypes.CONDITION], conditionNodes: [
          {...NodeTemplates[OptionTypes.BRANCH], nodeName: '条件1', childNode: o},
          {...NodeTemplates[OptionTypes.BRANCH], nodeName: '条件2'},
        ]
      };
    }
    if (type === OptionTypes.BRANCH) {
      objRef.conditionNodes.push({...NodeTemplates[NodeTypes.BRANCH]});
    }
    updateNode();
  }

  // 删除节点
  function onDeleteNode(pRef, objRef, type, index) {
    if (window.confirm('是否删除节点？')) {
      if (type === NodeTypes.BRANCH) {
        console.log([...objRef.conditionNodes], index);
        objRef.conditionNodes.splice(index, 1);
        console.log(objRef.conditionNodes);
      } else {
        const newObj = objRef.childNode;
        pRef.childNode = newObj;
      }
      updateNode();
    }
  }


  // 获取节点
  function onSelectNode(pRef, objRef) {
    currentNode = {
      current: objRef,
      prev: pRef
    };
    console.log('currentNode:', currentNode);
    ref.current.open(true);
  }

  console.log(config);
  return (
    <WFC.Provider value={{config, updateNode, onAddNode, onDeleteNode, onSelectNode}}>
      <section className={styles.dingflowDesign}>
        <ZoomLayout>
          <Render config={config} onContentClick={()=>{console.log(1111);}} />
          <EndNode />
        </ZoomLayout>
      </section>
      <Drawer title="步骤设置" ref={ref}><Setps /></Drawer>
    </WFC.Provider>
  );
};

export default WorkFlow;
