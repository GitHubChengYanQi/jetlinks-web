import React, {useEffect} from 'react';
import {dbTableList} from '@/pages/BaseSystem/gen/GenUrl';
import {Button, Table, Modal} from 'antd';
import {useRequest} from '@/util/Request';
import FieldConfigList from "@/pages/BaseSystem/dbInfo/fieldConfig/fieldConfigList";

const {Column} = Table;


const GenDataBaseInfo = ({onChange, dataSourceId}) => {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const {data, run} = useRequest(dbTableList, {
    manual: true,
  });

  useEffect(() => {
    if (dataSourceId) {
      run({
        data: {
          dbId: dataSourceId,
        }
      });
    }
  }, [
    dataSourceId
  ]);

  return (
    <>
      <Table
        dataSource={data}
        pagination={false}
        rowKey="tableName"
        rowSelection={{
          onChange: (selectedRowKeys) => {
            onChange(selectedRowKeys);
          }
        }}
      >
        <Column title="表名" dataIndex="tableName" width={200}/>
        <Column title="名称" dataIndex="tableComment" width={200}/>
        <Column title="字段配置" align="right" render={(text,values) => {
          return (
            <Button onClick={() => {
              setVisible(values.tableName);
            }}>配置</Button>
          );
        }}/>
      </Table>
      <Modal
        title="字段配置"
        visible={visible}
        onOk={() => {

        }}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
        }}
        width={1200}
      >
        <FieldConfigList dbId={dataSourceId} tableName={visible}/>
      </Modal>
    </>
  );
};

export default GenDataBaseInfo;
