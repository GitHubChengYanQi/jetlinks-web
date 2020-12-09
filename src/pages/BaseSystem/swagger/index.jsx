import React from 'react';
import {baseURI} from '@/Config/BaseRequest';

const Swagger = () => {

  return(
    <iframe src={`${baseURI}/swagger-ui.html`} />
  );
};

export default Swagger;
