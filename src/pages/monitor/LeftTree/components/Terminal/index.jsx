import React, {useEffect, useState} from 'react';
import AntTree from '@/components/AntTree';
import Save from '@/pages/equipment/Category/Save';
import {useRequest} from '@/util/Request';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {isArray} from '@/util/Tools';

const Terminal = ({
  onChange,
  value,
  firstKey,
}) => {
  const [keys, setKeys] = useState(value ? [value] : []);

  const [saveVisible, setSaveVisible] = useState();
  const [currentItem, setCurrentItem] = useState({});

  const [treeData, setTreeData] = useState([]);

  const {loading, run} = useRequest(categoryFindAll, {
    manual: true,
    onSuccess: (res) => {
      let modelId;
      setTreeData(isArray(res).map(item => {
        const modelList = item.modelList || [];
        return {
          key: item.categoryId,
          title: item.name,
          selectable: false,
          children: modelList.map(item => {
            if (!modelId) {
              modelId = item.modelId;
            }
            return {
              key: item.modelId,
              title: item.name,
            };
          })
        };
      }));
      if (firstKey) {
        onChange(modelId, 'terminal');
        setKeys([modelId]);
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
      onChange={(keys) => {
        if (keys.length > 0) {
          onChange(keys[0], 'terminal');
          setKeys(keys);
        }
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
