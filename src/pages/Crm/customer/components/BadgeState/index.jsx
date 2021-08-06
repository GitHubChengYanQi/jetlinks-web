import React from 'react';
import {Badge} from 'antd';

const BadgeState = (props) => {

  const {state,text,color} = props;

  let colors;
  let texts;

  if (state !== undefined) {

    switch (state) {
      case 0:
        colors = color[state];
        texts = text[state];
        break;
      case 1:
        colors = color[state];
        texts = text[state];
        break;
      default:
        break;
    }

    return (
      <>
        <Badge color={colors} text={texts} />
      </>
    );
  } else {
    return null;
  }


};

export default BadgeState;
