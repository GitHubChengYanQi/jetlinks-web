import React, {useEffect} from 'react';
import {Select, Spin} from 'antd';
import Originator from '@/pages/Workflow/Nodes/Originator';
import {useRequest} from '@/util/Request';


export const Rule = (props) => {

  return (<Originator hidden {...props} />);
};


export const StautsId = (props) => {

  const {type, ...other} = props;

  const detailApi = {url: '/documentStatus/getDetails', method: 'GET'};

  const {loading, data, run} = useRequest(detailApi, {manual: true});

  useEffect(() => {
    run({params: {type}});
  }, []);

  if (loading) {
    return <Spin />;
  }

  const options = [];
  data && data.map((item) => {
    if (![0, 50, 99].includes(item.documentsStatusId)) {
      return options.push({label: item.name, value: item.documentsStatusId});
    }
    return null;
  });

  return (<Select options={options} {...other} />);

};
