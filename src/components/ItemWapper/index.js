import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class ItemWapper extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      value: ''
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        value: nextProps.value === undefined ? '' : nextProps.value   //  设置组件的被清空后的数值
      })
    }
  }

  render() {
    const {ItemNode,...other} = this.props;
    return (
      <ItemNode value={this.value} {...other}/>
    );
  }
}

export default ItemWapper;
