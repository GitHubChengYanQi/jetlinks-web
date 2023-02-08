import React, {useEffect, useState} from 'react';
import AntTree from '@/components/AntTree';
import Save from '@/pages/equipment/Category/Save';
import {useRequest} from '@/util/Request';
import {categoryFindAll, categoryFindAllByDevice} from '@/pages/equipment/Category/url';
import {isArray} from '@/util/Tools';

const Terminal = ({
  onChange,
  value,
  firstKey,
  noEmpty,
}) => {

  const [keys, setKeys] = useState(value ? [value] : []);

  const [saveVisible, setSaveVisible] = useState();
  const [currentItem, setCurrentItem] = useState({});

  const [treeData, setTreeData] = useState([]);

  const {loading, run} = useRequest(categoryFindAllByDevice, {
    manual: true,
    onSuccess: (res) => {
      let model;
      setTreeData(isArray(res).map(item => {
        const modelList = item.modelList || [];
        return {
          key: item.categoryId,
          title: item.name,
          selectable: false,
          children: modelList.map(item => {
            if (!model) {
              model = item;
            }
            return {
              key: item.modelId,
              title: item.name,
            };
          })
        };
      }));
      if (firstKey) {
        onChange(model?.modelId, 'terminal', model);
        setKeys(model?.modelId ? [model?.modelId] : []);
      }
    }
  });

  useEffect(() => {
    run({data: {}});
  }, []);

  const formatData = (data) => {
    return data.map(item => {
      return {
        ...item,
        children: formatData(item.children || []),
      };
    });
  };

  return <>
    <AntTree
      loading={loading}
      onChange={(keys, options) => {
        if (keys.length === 0 && noEmpty) {
          return;
        }
        onChange(keys[0], 'terminal', options.selected ? {
          modelId: options?.node?.key,
          name: options?.node?.title
        } : {});
        setKeys(keys);
      }}
      value={keys}
      treeData={formatData(treeData)}
    />

    <Save
      status
      close={() => {
        setSaveVisible(false);
        setCurrentItem({});
      }}
      visible={saveVisible}
      data={currentItem}
      success={() => {

      }} />
  </>;
};

export default Terminal;
