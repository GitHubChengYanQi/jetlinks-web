import React, {useState} from 'react';
import Cascader from '@/components/Cascader';
import {storehousePositionsTreeView} from '@/pages/Erp/storehouse/components/storehousePositions/storehousePositionsUrl';
import {Button, Card, Divider, message, Space} from 'antd';
import {useRequest} from '@/util/Request';
import {instockEdit} from '@/pages/Erp/instock/InstockUrl';


const CascaderPosition = ({value, onSuccess, ...props}) => {

  const {run} = useRequest(instockEdit, {
    manual: true, onSuccess: () => {
      onSuccess();
    }
  });

  const [position, setPosition] = useState();

  if (value) {
    return (
      <Card title="选择库位">
        <Cascader
          width="100%"
          defaultParams={{params: {ids: value.storeHouseId}}}
          api={storehousePositionsTreeView}
          onChange={(value) => {
            setPosition(value);
          }} value={position} />
        <br />
        <div style={{textAlign: 'center'}}>
          <Space style={{marginTop: 16}} align="center">
            <Button type="primary" onClick={async () => {
              if (position){
                await run({
                  data:{
                    ...value,
                    storehousePositionsId:position,
                  }
                });
              }else {
                message.error('请选择库位！');
              }

            }}>确定</Button>
            <Button type="default" onClick={() => {
              onSuccess();
            }}>取消</Button>
          </Space>
        </div>
      </Card>
    );
  }
};

export default CascaderPosition;
