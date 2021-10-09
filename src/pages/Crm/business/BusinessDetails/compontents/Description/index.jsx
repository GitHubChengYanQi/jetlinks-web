import React from 'react';
import {Descriptions} from 'antd';
import {useRequest} from '@/util/Request';
import {businessEdit, OrgNameListSelect} from '@/pages/Crm/business/BusinessUrl';
import SelectEdit from '@/pages/Crm/customer/components/Edit/SelectEdit';
import DateEdit from '@/pages/Crm/customer/components/Edit/DateEdit';
import moment from 'moment';

const Description = (props) => {

  const {data} = props;

  const {run} = useRequest(businessEdit, {manual: true});

  const {data: OriginData} = useRequest(OrgNameListSelect);


  if (data) {
    return (
      <>
        <Descriptions column={2} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="销售流程">{data.sales ? data.sales.name : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="赢率">{data.process ? `${data.process.percentage}%` : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="立项日期">
            <DateEdit
              value={data.time}
              onChange={async (value) => {
                await run({
                  data: {
                    ...data,
                    time: value
                  }
                });
              }}
              disabledDate={(current) => {
                return current && current > moment().endOf('day');
              }} />
          </Descriptions.Item>
          <Descriptions.Item label="商机来源">
            <SelectEdit
              value={data.originId}
              data={OriginData}
              val={data.origin && data.origin.originName}
              onChange={async (value) => {
                await run({
                  data: {
                    ...data,
                    originId: value
                  }
                });
              }} /></Descriptions.Item>
        </Descriptions>
      </>
    );
  }


};
export default Description;
