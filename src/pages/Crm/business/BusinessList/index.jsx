import React, {useState} from 'react';
import {Divider, Layout, Tree} from 'antd';
import BusinessTable from '@/pages/Crm/business/components/BusinessTable';
import styles from '@/pages/Crm/business/BusinessList/index.module.scss';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';
import {crmBusinessSalesListSelect, OrgNameListSelect} from '@/pages/Crm/business/BusinessUrl';
import ListLayout from '@/layouts/ListLayout';

const {Sider, Content} = Layout;

const BusinessList = () => {

  const {loading, data, run: crmBusinessSalesRun} = useRequest({
    url: '/crmBusinessSales/list',
    method: 'POST',
    rowKey: 'salesId'
  });
  const {loading: log, data: da, run: originRun} = useRequest({
    url: '/origin/list',
    method: 'POST',
    rowKey: 'originId'
  });

  const [value, setValue] = useState();
  const [originValue, setOriginValue] = useState();

  const crmBusinessSales = data ? data.map((values) => {
    return {
      title: values.name,
      key: values.salesId,
    };
  }) : [];

  const origin = da ? da.map((values) => {
    return {
      title: values.originName,
      key: values.originId,
    };
  }) : [];

  const [status, setStatus] = useState();
  const [state, setState] = useState();
  const [statement, setStatement] = useState();

  const Left = () => {
    return (
      <div>
        <Tree
          showLine
          onSelect={(value) => {
            setStatement(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有完单',
              key: '',
              children: [
                {
                  title:'赢单',
                  key:'赢单'
                },{
                  title:'输单',
                  key:'输单'
                },
              ],
            },
          ]}
        />
        <Divider />
        <div>
          <Select
            api={crmBusinessSalesListSelect}
            placeholder="搜索流程"
            value={value}
            bordered={false}
            notFoundContent={null}
            defaultActiveFirstOption={false}
            onChange={async (value) => {
              await crmBusinessSalesRun(
                {
                  data: {
                    salesId: value
                  }
                }
              );
              setValue(value);
            }} />
        </div>
        <Tree
          showLine
          onSelect={(value) => {
            setStatus(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有流程',
              key: '',
              children: crmBusinessSales,
            },
          ]}
        />
        <Divider />
        <div>
          <Select
            api={OrgNameListSelect}
            placeholder="搜索来源"
            value={originValue}
            bordered={false}
            notFoundContent={null}
            defaultActiveFirstOption={false}
            onChange={async (value) => {
              await originRun(
                {
                  data: {
                    originId: value
                  }
                }
              );
              setOriginValue(value);
            }} />
        </div>
        <Tree
          showLine
          onSelect={(value) => {
            setState(value);
          }}
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有来源',
              key: '',
              children: origin,
            },
          ]}
        />
        <Divider />
      </div>
    );
  };


  return (
    <ListLayout left={Left()}>
      <BusinessTable status={status} state={state} statement={statement}  />
    </ListLayout>
  );
};
export default BusinessList;
