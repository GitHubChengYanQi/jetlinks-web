import {request as requestProivde} from '@/util/Service';

const request = async (config) => {

  // const {ajaxService} = Service();
  try {
    return await requestProivde({
      ...config
    });
  }catch (e) {
    return {};
  }

};
export default request;
