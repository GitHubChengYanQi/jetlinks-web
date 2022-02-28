import React, {useState} from 'react';
import {Button, message, Modal, Modal as AntModal, Space, Table as AntTable, Upload} from 'antd';
import cookie from 'js-cookie';

import Icon from '@/components/Icon';

const Import = ({
  onOk = () => {
  },
  templateUrl,
  url,
  title,
  module,
}) => {

  const [filelist, setFilelist] = useState([]);

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState();

  const importErrData = (errData) => {

    const columns = [];

    switch (module) {
      case 'sku':
        columns.push({
          title: '错误行',
          dataIndex: 'line',
        }, {
          title: '物料分类',
          dataIndex: 'spuClass'
        }, {
          title: '产品',
          dataIndex: 'classItem'
        }, {
          title: '型号',
          dataIndex: 'spuName'
        }, {
          title: '物料编码',
          dataIndex: 'standard'
        }, {
          title: '单位',
          dataIndex: 'unit'
        }, {
          title: '是否批量',
          dataIndex: 'isNotBatch'
        }, {
          title: '参数配置',
          dataIndex: 'attributes',
          render: (value) => {
            return value && value.map((item) => {
              return item;
            }).toString();
          }
        }, {
          title: '问题原因',
          dataIndex: 'error'
        },);
        break;
      case 'customer':
        columns.push({
          title: '物料编码',
          dataIndex: 'coding',
        }, {
          title: '品牌',
          dataIndex: 'brand',
        }, {
          title: '供应商',
          dataIndex: 'supplier',
        }, {
          title: '行',
          dataIndex: 'line',
        }, {
          title: '错误信息',
          dataIndex: 'error',
        },);
        break;
      default:
        break;
    }


    AntModal.error({
      width: 1200,
      title: `异常数据 / ${errData.length}`,
      content: <div style={{padding: 8}}>
        <AntTable rowKey="key" dataSource={errData && errData.map((item, index) => {
          return {
            key: index,
            ...item
          };
        }) || []} columns={columns} pagination={false} scroll={{y: '50vh'}} />
      </div>
    });
  };

  const handleUpload = () => {
    const formData = new FormData();
    filelist.forEach(file => {
      formData.append('file', file);
    });
    setLoading(true);

    fetch(url, {
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

  const templateName = () => {
    switch (module) {
      case 'customer':
        return '《供应商模板》';
      case 'sku':
        return '《基础物料模板》';
      default:
        break;
    }
  };


  return <>
    <Button icon={<Icon type="icon-daoru" />} onClick={() => {
      setVisible(true);
    }}>{title}</Button>
    <Modal
      title={title}
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
          1、下载 <a href={templateUrl}>{templateName()}</a>
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
          action={url}
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
          {filelist.length === 0 && <Space>
            <Button icon={<Icon type="icon-daoru" />} ghost type="primary">上传文件</Button>
            附件支持类型：XLSX，最大不超过10M
          </Space>}
        </Upload>
      </Space>
    </Modal>
  </>;

};

export default Import;
