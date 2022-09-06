import React, {useEffect, useState} from 'react';
import {Card, Button, Space, Menu, Dropdown} from 'antd';
import styles from '@/utils/table.less';
import {ConnectState, Dispatch} from '@/models/connect';
import SearchForm from '@/components/SearchForm';
import Render from "@/components/Render";
import Warning from "@/components/Warning";
import {connect} from "dva";
import AntTable from "@/components/AntTable";
import encodeQueryParam from "@/utils/encodeParam";
import AccountAsk from "@/pages/user/login2/AccountAsk";
import moment from "moment";


interface Props {
  tenant: any;
  dispatch: Dispatch;
  loading: boolean;
}

interface State {
  data: any;
  searchParam: any;
  saveVisible: boolean;
  saveLoading: boolean;
  autzVisible: boolean;
}

const Tenant: React.FC<Props> = props => {

  const {tenant = {}, dispatch, loading} = props;

  const result = tenant.result || {};

  const initState: State = {
    data: {},
    searchParam: {pageSize: 10},
    saveVisible: false,
    saveLoading: false,
    autzVisible: false,
  };

  const [searchParam, setSearchParam] = useState(initState.searchParam);

  const [askAccount, setAskAccount] = useState<any>();

  const handleSearch = (params?: any) => {
    const temp = {...searchParam, ...params};
    setSearchParam(temp);
    dispatch({
      type: 'tenant/query',
      payload: encodeQueryParam(temp),
    });
  };

  useEffect(() => {
    handleSearch(searchParam);
  }, []);

  const dataSource = result.data || []

  const columns: any[] = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value: any, record: any, index: any) => <Render text={index + 1} width={50} />
    },
    {
      title: '审核结果',
      dataIndex: 'status',
      align: 'center',
      render: (text: any) => <Render>
        <Button danger={text !== 1} type='link'>{text === 1 ? '通过' : '待审核'}</Button></Render>
    },
    {title: '企业名称', dataIndex: 'name', align: 'center', render: (text: any) => <Render width={200} text={text} />},
    {title: '统一社会信用代码', dataIndex: 'code', align: 'center', render: (text: any) => <Render text={text} />},
    {title: '企业经营场所', dataIndex: 'place', align: 'center', render: (text: any) => <Render width={200} text={text} />},
    {title: '联系人姓名', dataIndex: 'contactName', align: 'center', render: (text: any) => <Render text={text} />},
    {title: '联系人手机号码', dataIndex: 'contactPhone', align: 'center', render: (text: any) => <Render text={text} />},
    {title: '管理员账号', dataIndex: 'adminId', align: 'center', render: (text: any) => <Render text={text} />},
    {title: '身份证号 ', dataIndex: 'idNumber', align: 'center', render: (text: any) => <Render text={text} />},
    {title: '营业执照 ', dataIndex: '9', align: 'center', render: (text: any) => <Render text={text} />},
    {
      title: '提交时间 ',
      dataIndex: 'createTime',
      align: 'center',
      render: (text: any) => <Render width={150} text={moment(text).format('YYYY-MM-DD HH:mm:ss')} />
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text: any, record: any) => (
        <Space>
          <Warning content='您确定通过么?'>
            <Button type='primary' ghost>通过</Button>
          </Warning>
          <Button type='primary' ghost onClick={() => setAskAccount(record)}>修改</Button>
          <Button type='primary' ghost>数据转发</Button>
          <Warning>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
    }
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content='您确定通过么？'>批量通过</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '3',
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />

  return <>
    <Card bordered={false}>
      <div className={styles.tableList}>
        <div>
          <SearchForm
            searchButtons={<Space>
              <Dropdown overlay={menu} placement="bottom">
                <Button>批量操作</Button>
              </Dropdown>
              <Button>导出</Button>
            </Space>}
            padding={0}
            search={(params: any) => {
              handleSearch({terms: {...params}, pageSize: 10, pageIndex: 0});
            }}
            formItems={[
              {
                label: '审核结果',
                key: 'jg',
                type: 'select',
              },
              {
                label: '提交时间',
                key: 'time',
                type: 'dateTime',
              },
              {
                label: '企业查询',
                key: 'status',
                type: 'string',
              },
              {
                label: '联系人查询',
                key: 'note',
                type: 'string',
              },
            ]}
          />
        </div>
        <div className={styles.StandardTable}>
          <AntTable
            result={result}
            handleSearch={handleSearch}
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
          />
        </div>
      </div>
    </Card>

    <AccountAsk
      visibilityToggle={false}
      visible={askAccount}
      onClose={() => setAskAccount(null)}
      data={askAccount || {}}
    />
  </>
};

export default connect(({tenant, loading}: ConnectState) => ({
  tenant,
  loading: loading.models.tenant,
}))(Tenant);


