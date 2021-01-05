import React, { useImperativeHandle } from 'react';
import { Input, Button } from 'antd';
import { Form, FormItem, InternalFieldList as FieldList, createFormActions } from '@formily/antd';
import { DeleteOutlined, UpOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.scss';


const actions = createFormActions();

const Options = (props, ref) => {

  const { value } = props;

  useImperativeHandle(ref, () => ({
    getConfig: () => {
      const options = actions.getFieldValue('optionsList');
      const value = options.map((item) => {
        return (
          {
            label: item.label,
            value: item.value
          }
        );
      });
      return { options: value };
    }
  }));

  return (
    <Form
      actions={actions}
    >
      <FieldList
        name="optionsList"
        initialValue={
          value && value.config?
            value.config.options : [
              { label: '', value: '' },
            ]}
      >
        {({ state, mutators }) => {
          const onAdd = () => mutators.push();
          return (
            <div>
              {state.value.map((item, index) => {
                const onInsertAfter = index => mutators.insert(index + 1, { label: '', value: '' });
                const onRemove = index => mutators.remove(index);
                const onMoveUp = index => mutators.moveUp(index);
                const onMoveDown = index => mutators.moveDown(index);
                return (
                  <div key={index} className={styles.row}>
                    <FormItem
                      name={`optionsList.${index}.label`}
                      component={Input}
                      title="label"
                    />
                    <FormItem
                      name={`optionsList.${index}.value`}
                      component={Input}
                      title="value"
                    />
                    <Button onClick={() => {
                      onInsertAfter(index);
                    }}>
                      插入
                    </Button>
                    <Button icon={<DeleteOutlined/>} onClick={() => {
                      onRemove(index);
                    }}/>
                    <Button icon={<UpOutlined/>} onClick={() => {
                      onMoveUp(index);
                    }}/>
                    <Button icon={<DownOutlined/>} onClick={() => {
                      onMoveDown(index);
                    }}/>
                  </div>
                );
              })}
              <div style={{ textAlign: 'right', paddingRight: 16 }}>
                <Button onClick={onAdd} icon={<PlusOutlined/>}>增加</Button>
              </div>
            </div>
          );
        }}
      </FieldList>
    </Form>
  );
};

export default React.forwardRef(Options);
