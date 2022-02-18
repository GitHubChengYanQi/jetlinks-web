import React, {useState} from 'react';
import {Button, message, Modal, Modal as AntModal, Space, Table as AntTable, Upload} from 'antd';
import cookie from 'js-cookie';
import {config} from 'ice';
import Icon from '@/components/Icon';
import Table from '@/components/Table';

const {baseURI} = config;

const Import = ({
  onOk = () => {
  },
  templateUrl,
}) => {

  const [filelist, setFilelist] = useState([]);

  const [loading, setLoading] = useState(false);

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
        error: item.error,
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
          <Table.Column title="问题原因" dataIndex="error" />
        </AntTable>
      </div>
    });
  };

  const handleUpload = () => {
    const formData = new FormData();
    filelist.forEach(file => {
      formData.append('file', file);
    });
    setLoading(true);

    fetch(`${baseURI}Excel/importSku`, {
      method: 'POST',
      headers: {Authorization: cookie.get('tianpeng-token')},
      body: formData,
    })
      .then((res) => {
        res.json().then((response) => {
          if (!response || response.errCode !== 0) {
            return message.error('导入失败!');
          }
          message.success('导入成功!');
          response.data && response.data.length > 0 && importErrData(response.data);
        });
      })
      .then(() => {
        setFilelist([]);
        setVisible(false);
        onOk();
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return <>
    <Button icon={<Icon type="icon-daoru" />} onClick={() => {
      setVisible(true);
    }}>导入物料</Button>
    <Modal
      title="导入基础物料"
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={[
        <Button
          loading={loading}
          disabled={filelist.length === 0}
          type="primary"
          key={1}
          onClick={() => {
            handleUpload();
          }}>开始导入</Button>,
        <Button key={2} onClick={() => {
          setVisible(false);
        }}>取消</Button>
      ]}
      width={800}>
      <Space direction="vertical">
        <div>
          操作步骤：
        </div>
        <div>
          1、下载 <a href={templateUrl}>《基础物料模板》</a>
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

        <Upload
          maxCount={1}
          listType="picture"
          fileList={filelist}
          onRemove={() => {
            setFilelist([]);
          }}
          action={`${baseURI}Excel/importSku`}
          headers={
            {Authorization: cookie.get('tianpeng-token')}
          }
          name="file"
          beforeUpload={(file) => {
            if (file.name.indexOf('xlsx') === -1) {
              message.warn('请上传xlsx类型的文件!');
              return false;
            }
            setFilelist([file]);
            return false;
          }}
        >
          <Space>
            <Button icon={<Icon type="icon-daoru" />} ghost type="primary">上传文件</Button>
            附件支持类型：XLSX，最大不超过10M
          </Space>
        </Upload>
      </Space>
    </Modal>
  </>;

};

export default Import;
