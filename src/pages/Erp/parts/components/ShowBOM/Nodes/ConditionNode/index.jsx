import React, {useContext} from 'react';
import AddNode from '../AddNode';
// eslint-disable-next-line import/no-cycle
import Render from '../Render';
import {NodeTypes} from '../Constants';
import WFC from '../../OperatorContext';
import styles from './index.module.scss';
import ApproverNode from '@/pages/Erp/parts/components/ShowBOM/Nodes/ApproverNode';


const CoverLine = ({first = false, last = false}) => {

  return (<React.Fragment>
    {first && <div className="top-left-cover-line" />}
    {first && <div className="bottom-left-cover-line" />}
    {last && <div className="top-right-cover-line" />}
    {last && <div className="bottom-right-cover-line" />}
  </React.Fragment>);
};

const BranchNode = (props) => {


  const {first = false, last = false} = props;

  return (
    <div className="condition-node">
      <div className="condition-node-box">
        <ApproverNode {...props} />
      </div>
    </div>
  );
};


function ConditionNode({conditionNodeList: branches = [], ...restProps}) {

  const {onAddNode, onDeleteNode, onSelectNode} = useContext(WFC);

  function addBranch() {
    onAddNode(NodeTypes.BRANCH, restProps.pRef, restProps.objRef);
  }

  function delBranch(i) {
    if (branches.length === 2) {
      onDeleteNode(restProps.pRef, restProps.objRef);
      return;
    }
    onDeleteNode(restProps.pRef, restProps.objRef, NodeTypes.BRANCH, i);
  }

  function onBranchClick(objRef) {
    onSelectNode(restProps.objRef, objRef);
  }

  return (
    branches && branches.length > 0 && <div className={styles.branchWrap}>
      <div className="branch-box-wrap">
        <div className="branch-box">
          {/*<div*/}
          {/*  className="add-branch"*/}
          {/*  // onClick={addBranch}*/}
          {/*>*/}
          {/*  */}
          {/*</div>*/}
          {branches.map((item, index) => {
            return (<div className="col-box" key={index.toString()}>
              <BranchNode
                {...item} first={index === 0} onBranchClick={onBranchClick} delBranch={() => delBranch(index)}
                last={index === branches.length - 1} objRef={item} />
              {item.childNode && <Render pRef={item} config={item.childNode} />}
              {item.luYou && <Render pRef={item} config={item.luYou} />}
              <CoverLine first={index === 0} last={index === branches.length - 1} />
            </div>);
          })}
        </div>
        <AddNode objRef={restProps.objRef} />
      </div>
    </div>
  );
}

export default ConditionNode;
