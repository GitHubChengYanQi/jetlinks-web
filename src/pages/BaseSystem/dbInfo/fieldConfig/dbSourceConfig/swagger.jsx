import React,{useImperativeHandle,useState} from 'react';
import { useRequest } from '@/util/Request';
import { swaggerUrl } from '@/pages/BaseSystem/swagger/swaggerUrl';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const Swagger = (props,ref)=>{

  const [value,setValue] = useState(null);
  const {data} = useRequest(swaggerUrl);

  useImperativeHandle(ref,()=>({
    getConfig:()=>{
      return {apiUrl:value};
    }
  }));

  if (!data) {
    return null;
  }
  const {tags, paths} = data;

  return (
    <Select style={{ width: '100%' }} showSearch onChange={(value)=>{
      setValue(value);
    }}>
      {
        tags.map((tag, index) => {
          return (
            <OptGroup key={`tag-${index}`} label={tag.name}>
              {
                Object.keys(paths).map(pathKey => {
                  return Object.keys(paths[pathKey]).map(methodKey => {
                    const method = paths[pathKey][methodKey];
                    return method.tags.findIndex(t => t === tag.name)!==-1 && <Option value={pathKey}  key={`${methodKey}-${pathKey}`}>{method.summary}({pathKey})</Option>;
                  });
                })
              }
            </OptGroup>
          );
        })
      }
    </Select>
  );
};

export default React.forwardRef(Swagger);
