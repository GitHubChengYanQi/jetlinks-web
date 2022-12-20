import React, {useState} from 'react';
import {Drawer} from 'antd';
import {useHistory} from 'ice';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import Amap from '@/components/Amap';
import {LinkButton} from '@/components/Button';
import Info from '@/pages/monitor/Info';
import Save from '@/pages/monitor/Info/Save';

const Map = () => {

  const history = useHistory();


  const [infoVisible, setInfoVisible] = useState({});
  const [saveVisible, setSaveVisible] = useState(false);

  return <Box>
    <div style={{padding: 24,height:'100%'}}>
      <Amap show onMarkerClick={setInfoVisible} onHistory={(url) => {
        history.push(url);
      }}/>
    </div>
    <Drawer
      destroyOnClose
      title={`终端备注：${infoVisible.remarks}    设备型号：${infoVisible.modelName}`}
      width="60vw"
      placement="right"
      onClose={() => setInfoVisible({})}
      open={infoVisible.modelId}
      extra={<LinkButton onClick={() => setSaveVisible(true)}>报警设置</LinkButton>}
    >
      <Info deviceId={infoVisible.deviceId} modelId={infoVisible.modelId}/>
    </Drawer>
    <Save visible={saveVisible} close={() => setSaveVisible(false)} data={{}}/>
  </Box>;
};

export default Map;
