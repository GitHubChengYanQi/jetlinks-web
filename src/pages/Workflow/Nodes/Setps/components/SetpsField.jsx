import React, {useEffect, useRef} from 'react';
import {Checkbox, Select, Spin} from 'antd';
import Originator from '@/pages/Workflow/Nodes/Originator';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';
import Setting from '@/pages/BaseSystem/Documents/Setting';


export const Rule = (props) => {
  return (<Originator hidden {...props} />);
};

export const StautsId = (props) => {

  const {type, value, onChange} = props;

  const ref = useRef();

  const detailApi = {url: '/documentStatus/getDetails', method: 'GET'};

  const {loading, data, run, refresh} = useRequest(detailApi, {manual: true});

  useEffect(() => {
    run({params: {type}});
  }, []);

  const getItem = (item) => {
    return {
      label: item.name,
      value: item.documentsStatusId,
      actions: item.actionResults ? item.actionResults.map(item => {
        return {
          name: item.actionName,
          action: item.action,
          actionId: item.documentsActionId,
        };
      }) : []
    };
  };

  useEffect(() => {
    if (value && data) {
      const status = data.filter(item => item.documentsStatusId === value);
      if (status && status[0]) {
        onChange(getItem(status[0]));
      }
    }
  }, [data]);

  if (loading) {
    return <Spin />;
  }

  const options = [];
  data && data.map((item) => {
    if (![50, 99].includes(item.documentsStatusId)) {
      return options.push(getItem(item));
    }
    return null;
  });

  return (
    <>
      <Select
        options={[{label: <a>增加状态</a>, value: 'add'}, ...options]}
        value={value && value.value}
        onChange={(value, option) => {
          if (value === 'add') {
            ref.current.open(type);
            return;
          }
          onChange(option);
        }}
      />

      <Modal width={1250} component={Setting} ref={ref} onSuccess={refresh} />
    </>
  );
};

export const ActionIds = ({value = [], onChange, actions = []}) => {
  if (actions.length === 0) {
    return <>无</>;
  }

  const change = (item, checked) => {
    const newActions = actions.map(oldItem => {
      if (oldItem.actionId === item.actionId) {
        return {
          actionId: item.actionId,
          checked,
        };
      }
      return item;
    });
    onChange(newActions);
  };

  return <>
    {
      actions.map((item, index) => {
        return <div key={index} style={{display: 'flex'}}>
          <div style={{flexGrow: 1}}>
            {item.name}
          </div>
          <Checkbox
            checked={value[index] && value[index].checked}
            key={index}
            onChange={(action) => {
              if (action.target.checked) {
                change(item, true);
              } else {
                change(item, false);
              }
            }}
          >
            完成之后跳到下个节点
          </Checkbox>
        </div>;
      })
    }
  </>;
};
