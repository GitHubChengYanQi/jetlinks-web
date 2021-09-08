import React, {useEffect, useState} from 'react';
import {Upload as AntUpload, Button, Space, Comment, Table as AntTable, Table, Pagination} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;

const Upload = (props) => {

  const {customerId} = props;


  const [oss, setOss] = useState();


  const {run} = useRequest({
    url: '/media/getToken',
    method: 'GET'
  }, {manual: true});
  const {run: runFile} = useRequest({
    url: '/customerFile/add',
    method: 'POST'
  }, {manual: true});
  const {run: runDeleteFile} = useRequest({
    url: '/customerFile/delete',
    method: 'POST'
  }, {manual: true});
  const {data, run: runListFile, refresh} = useRequest({
    url: '/customerFile/list?',
    method: 'POST',
    data: {customerId}
  }, {manual: true});

  useEffect(() => {
    runListFile({
      params: {
        limit: 20,
        page: 1
      }
    });
  }, []);


  const fileList = data && data.data ? data.data.map((items, index) => {
    return {
      uid: items.uid,
      name: items.name,
      url: items.url,
    };
  }) : [];


  return (
    <Space direction="vertical" style={{width: '100%'}} size="large">
      <AntUpload
        action={oss && oss.host}
        data={oss}
        listType="picture"
        fileList={fileList}
        beforeUpload={async (file) => {
          const type = file.type.split('/')[1];
          if (type) {
            const data = await run(
              {
                params: {
                  type
                }
              }
            );
            setOss({...data});
          } else {
            alert('附件类型不正确！');
          }
        }}
        onChange={async ({file}) => {
          if (file.percent === 0) {
            await runFile({
              data: {
                url: `${oss && oss.host}/${oss && oss.key}`,
                customerId,
                uid: file.uid,
                name: file.name
              }
            });
            await refresh();
          }
        }}
        onRemove={async (file) => {
          await runDeleteFile({
            data: {
              uid: file.uid
            }
          });
          await refresh();
        }}
        multiple
      >
        <div>
          <Button icon={<UploadOutlined />}>上传附件</Button>
        </div>
      </AntUpload>
      <div style={{textAlign: 'center'}}>
        <Pagination
          style={{display: 'inline-block'}}
          current={data && data.current}
          total={data && data.count}
          pageSize={data && data.pageSize || 0}
          onChange={(value) => {
            runListFile({
              params: {
                page: value,
                limit: 20,
              }
            });
          }} />
      </div>
    </Space>
  );
};

export default Upload;
