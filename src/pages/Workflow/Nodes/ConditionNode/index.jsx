import React, {useContext} from 'react';
import Icon from '@/components/Icon';
import AddNode from '../AddNode';
// eslint-disable-next-line import/no-cycle
import Render from '../Render';
import {NodeTypes} from '../Constants';
import WFC from '../../OperatorContext';
import styles from './index.module.scss';


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
        <div className="auto-judge">
          {!first && <div className="sort-left" onClick={props.sortLeft} />}
          <div className="title-wrapper">
            <span className="editable-title">{props.nodeName}</span>
            {/*<span className="priority-title">优先级{props.priorityLevel}</span>*/}
            <Icon type="icon-close" className="close" onClick={props.delBranch} />
          </div>
          {!last && <div className="sort-right" onClick={props.sortRight} />}
          <div className="content" onClick={() => props.onBranchClick(props.objRef)}>
            <div className="text">
              {props.owner || <span className="placeholder">无条件</span>}
            </div>
            {/* <i className="anticon anticon-right arrow"></i> */}
          </div>
        </div>
        <AddNode objRef={props.objRef} />
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
    console.log('delBranch(i)', (i));
    onDeleteNode(restProps.pRef, restProps.objRef, NodeTypes.BRANCH, i);
  }

  function sortLeft() {

  }

  function sortRight() {

  }

  function onBranchClick(objRef) {
    onSelectNode(restProps.objRef, objRef);
  }

  return (
    branches && branches.length > 0 && <div className={styles.branchWrap}>
      <div className="branch-box-wrap">
        <div className="branch-box">
          <div className="add-branch" onClick={addBranch}>添加条件</div>
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
