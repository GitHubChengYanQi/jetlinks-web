import React, {useState} from 'react';
import {Button, message, Modal, Modal as AntModal, Space, Table as AntTable, Upload} from 'antd';
import cookie from 'js-cookie';
import {config} from 'ice';
import Icon from '@/components/Icon';
import Table from '@/components/Table';

const {baseURI} = config;

const Import = () => {


  const [filelist, setFilelist] = useState([]);

  const [visible, setVisible] = useState();

  const importErrData = (errData) => {
    const data = errData && errData.map((item, index) => {
      return {
        key: index,
        line: item.line,
        sku: item.classItem,
        class: item.spuClass,
        unit: item.unit,
        name: item.spuName,
        coding: item.standard,
        batch: item.isNotBatch,
        attributes: item.attributes && item.attributes.map((item) => {
          return item;
        }).toString()
      };
    });
    AntModal.error({
      width: 1200,
      title: `异常数据 / ${data.length}`,
      content: <div style={{padding: 8}}>
        <AntTable rowKey="key" dataSource={data || []} pagination={false} scroll={{y: '50vh'}}>
          <Table.Column title="错误行" dataIndex="line" />
          <Table.Column title="物料分类" dataIndex="class" />
          <Table.Column title="产品" dataIndex="sku" />
          <Table.Column title="型号" dataIndex="name" />
          <Table.Column title="物料编码" dataIndex="coding" />
          <Table.Column title="单位" dataIndex="unit" />
          <Table.Column title="是否批量" dataIndex="batch" />
          <Table.Column title="参数配置" dataIndex="attributes" />
        </AntTable>
      </div>
    });
  };


  return <>
    <Button icon={<Icon type="icon-daoru" />} onClick={() => {
      setVisible(true);
    }}>导入物料</Button>
    <Modal title="导入基础物料" visible={visible} onCancel={() => {
      setVisible(false);
    }} footer={[]} width={800}>
      <Space direction="vertical">
        <div>
          操作步骤：
        </div>
        <div>
          1、下载 <a>《基础物料模板》</a>
        </div>
        <div>
          2、打开下载表，将对应信息填入或粘贴至表内，为保证导入成功，请使用纯文本或数字
        </div>
        <div>
          3、信息输入完毕并打开后，点击下方【上传文件】按钮选择已保存的EXCEL文档
        </div>
        <div>
          4、点击【开始导入】
        </div>

        <Space>
          <Upload
            fileList={filelist}
            action={`${baseURI}Excel/importSku`}
            headers={
              {Authorization: cookie.get('tianpeng-token')}
            }
            name="file"
            beforeUpload={() => {
              message.loading({
                content: '导入中，请稍后...',
                key: 1,
                style: {
                  marginTop: '20vh',
                },
              });
              return true;
            }}
            onChange={async ({file, fileList}) => {
              setFilelist(fileList);
              if (file.status === 'done') {
                setFilelist([]);
                setVisible(false);
                if (file.response.data && file.response.data.length > 0) {
                  importErrData(file.response && file.response.data);
                }
                message.success({
                  content: '导入成功！',
                  key: 1,
                  duration: 2,
                  style: {
                    marginTop: '20vh',
                  },
                });
              }
            }}
          >
            <Button icon={<Icon type="icon-daoru" />} ghost type="primary">上传文件</Button>
          </Upload>
          <div>
            附件支持类型：XLSX，最大不超过10M
          </div>
        </Space>
      </Space>
    </Modal>
  </>;

};

export default Import;
