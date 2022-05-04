import React, {useImperativeHandle, useRef} from 'react';
import Drawer from '@/components/Drawer';
import Setps from '@/pages/Workflow/Nodes/Setps';
import Originator from '@/pages/Workflow/Nodes/Originator';
import Branchs from '@/pages/Workflow/Nodes/Branchs';

const Audit = ({
  type:formType,
  currentNode,
  updateNode,
  module,
}, ref) => {

  const refStart = useRef();
  const refAudit = useRef();
  const refBranch = useRef();

  const refType = (typeNumber) => {
    switch (typeNumber) {
      case '0':
      case '2':
        refStart.current.open(true);
        break;
      case '1':
        refAudit.current.open(true);
        break;
      case '3':
        switch (formType) {
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
        break;
      default:
        break;
    }
  };

  useImperativeHandle(ref, () => (
    {
      refType
    }
  ));

  return <>
    <Drawer title="步骤设置" ref={refAudit} width={800}>
      <Setps
        type={formType}
        module={module}
        value={currentNode && currentNode.current && {
          type: currentNode.current.stepType,
          auditRule: currentNode.current.auditRule && currentNode.current.auditRule.rules,
          documentsStatusId: currentNode.current.auditRule && currentNode.current.auditRule.documentsStatusId,
        }}
        onChange={(value) => {
          currentNode.current.auditRule = {
            type: value.type,
            rules: value.auditRule,
            documentsStatusId: value.documentsStatusId,
            formType
          };
          currentNode.current.stepType = value.type;
          refAudit.current.close();
          updateNode();
        }}
        onClose={() => {
          refAudit.current.close();
        }}
      />
    </Drawer>
    <Drawer title="发起人设置" ref={refStart} width={800}>
      <Originator
        value={currentNode && currentNode.current && currentNode.current.auditRule && currentNode.current.auditRule.rules}
        onChange={(value) => {
          currentNode.current.auditRule = {
            type: currentNode.current.type === '0' ? 'start' : 'send',
            documentsStatusId: currentNode.current.type === '0' && 0,
            rules: value,
            formType
          };
          updateNode();
          refStart.current.close();
        }} />
    </Drawer>
    <Drawer title="条件设置" ref={refBranch} width={800}>
      <Branchs
        value={currentNode && currentNode.current && currentNode.current.auditRule && currentNode.current.auditRule.rules}
        onChange={(value) => {
          currentNode.current.auditRule = {type: 'purchaseAsk', rules: value};
          updateNode();
          refBranch.current.close();
        }} />
    </Drawer>
  </>;
};

export default React.forwardRef(Audit);
