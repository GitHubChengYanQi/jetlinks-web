import React from 'react';
import ReactJson from 'react-json-view';

export default class Model extends React.PureComponent {
  render(){
    const { modelObj } = this.props;
    return (
      <ReactJson
        name={false}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        src={modelObj.properties} />
    );
  }
}
