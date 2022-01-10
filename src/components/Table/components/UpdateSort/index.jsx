import React from 'react';
import {Button, message} from 'antd';
import {useRequest} from '@/util/Request';

const UpdateSort = ({type, sorts,disabled, success}) => {

  const {run} = useRequest({
    url: '/sortUpdate/sort',
    method: 'POST',
  }, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功！');
      typeof success === 'function' && success();
    },
    onError: () => {
      message.error('保存失败！');
    }
  });

  const update = () => {
    run({
      data: {
        sortParams: sorts,
        type,
      }
    });
  };

  return <Button
    disabled={disabled}
    type="link"
    onClick={() => {
      update();
    }}
  >保存排序</Button>;
};

export default UpdateSort;
