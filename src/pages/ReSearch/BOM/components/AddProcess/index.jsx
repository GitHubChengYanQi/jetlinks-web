import React, {useState} from 'react';
import {Button, Form, Input, Space} from 'antd';
import {request} from '@/util/Request';
import {partsDetail, partsListSelect} from '@/pages/Erp/parts/PartsUrl';
import Select from '@/components/Select';
import FileUpload from '@/components/FileUpload';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const AddProcess = ({value, onChange,onClose}) => {

  const [skuResult, setSkuResult] = useState(value && value.skuResult);

  return <>
    <Form
      initialValues={value}
      labelCol={{span: 5}}
      wrapperCol={{span: 15}}
      onValuesChange={async (value) => {
        if (value.partsId) {
          const res = await request({
            ...partsDetail,
            data: {partsId: value.partsId}
          });
          setSkuResult(res.skuResult);
        }
      }}
      onFinish={(value) => {
        onChange({...value,skuResult});
      }}
    >

      <Form.Item name="coding" label="路线编号" rules={[{required: true, message: '请输入路线编号！'}]}>
        <Input />
      </Form.Item>

      <Form.Item name="name" label="路线名称" rules={[{required: true, message: '请输入路线名称！'}]}>
        <Input />
      </Form.Item>

      <Form.Item name="partsId" label="工艺物料清单" rules={[{required: true, message: '请选择工艺物料清单！'}]}>
        <Select api={partsListSelect} data={{type: 2}} />
      </Form.Item>

      <Form.Item label="产品">
        {skuResult ? <SkuResultSkuJsons skuResult={skuResult} /> : '请选择工艺物料清单'}
      </Form.Item>

      <Form.Item name="file" label="附件">
        <FileUpload maxCount={1} />
      </Form.Item>

      <Form.Item name="note" label="备注">
        <Input.TextArea />
      </Form.Item>


      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Space>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={()=>{
            onClose();
          }}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </>;
};

export default AddProcess;
