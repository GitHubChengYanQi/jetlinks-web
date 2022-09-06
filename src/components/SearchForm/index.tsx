import React, {ReactNode} from 'react';
import {
  Input,
  DatePicker,
  InputNumber,
  Form,
  Button,
  Select,
  TreeSelect, Space,
} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

import styles from './index.less';

interface Item {
  label: string;
  key: string;
  type: string;
  props?: any;
  value?: any;
}

interface Props extends FormComponentProps {
  formItems: Item[];
  search: Function;
  padding?: number;
  searchButtons?: ReactNode;
}

const SearchForm = (props: Props) => {
  const {
    formItems,
    padding,
    searchButtons,
  } = props;

  const [form] = Form.useForm();

  const search = () => {
    const data = form.getFieldsValue();
    props.search(data);
  };

  const renderItem = (type: string, label?: string, itemProps?: any) => {
    if (type === 'string') {
      return <Input placeholder={`请输入${label}`} />;
    }
    if (type === 'list') {
      const list = itemProps?.data || [];
      return (
        <Select
          style={{minWidth: 200}}
          options={list.map((item: any) => ({label: (item.name || item), value: (item.id || item)}))}
          placeholder={`请选择${label}`}
          mode={itemProps?.mode || 'multiple'}
        />
      );
    }
    if (type === 'select') {
      const list = itemProps?.data || [];
      return (
        <Select placeholder={`请选择${label}`} style={{minWidth: 200}}>
          {list.map((item: any) => (
            <Select.Option value={item.id || item} key={item.id || item}>
              {item.name || item}
            </Select.Option>
          ))}
        </Select>
      );
    }
    if (type === 'dateTime') {
      return <DatePicker showTime style={{width: '100%'}} />;
    }
    if (type === 'dateRange' || type === 'time') {
      return <DatePicker.RangePicker showTime style={{width: '100%'}} />;
    }
    if (type === 'dateTimeRange') {
      return (
        <DatePicker.RangePicker
          style={{width: '100%'}}
          showTime={{format: 'HH:mm'}}
          format="YYYY-MM-DD HH:mm"
          placeholder={['开始时间', '结束时间']}
        />
      );
    }
    if (type === 'number') {
      return <InputNumber style={{width: '100%'}} placeholder={`请输入${label}`} />;
    }
    if (type === 'treeSelect') {
      return (
        <TreeSelect
          dropdownStyle={itemProps?.dropdownStyle}
          allowClear
          treeDataSimpleMode
          showSearch={itemProps?.showSearch || false}
          multiple={itemProps?.multiple || false}
          placeholder={`${label}`}
          treeData={itemProps?.data || []}
          treeNodeFilterProp="title"
        />
      );
    }
    return <Input />;
  };
  return (
    <Form
      form={form}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          search();
        }
      }}
      style={{padding}}
      className={styles.antAdvancedSearchForm}
    >
      <Space wrap size='large'>
        {formItems.map(item => (
          <div key={item.key} style={{minWidth: 300}}>
            <Form.Item label={item.label} name={item.key} initialValue={item?.value}>
              {renderItem(item.type, item.label, item.props)}
            </Form.Item>
          </div>
        ))}
        <div
          style={{
            float: 'right',
            marginBottom: 24,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              search();
            }}
          >
            查询
          </Button>
          <Button
            style={{margin: '0 8px'}}
            onClick={() => {
              form.resetFields();
              props.search();
            }}
          >
            重置
          </Button>
          {searchButtons}
        </div>
      </Space>
    </Form>
  );
};

export default (SearchForm);
