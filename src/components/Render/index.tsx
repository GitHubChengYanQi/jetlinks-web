import React, {ReactNode} from 'react';

interface Props {
  text?: ReactNode,
  children?: ReactNode;
  className?: string;
  width?: number;
}

const Render: React.FC<Props> = (props) => {
  const {width = 100, text, children, className} = props;
  return <div className={className} style={{minWidth: width,}}>{text || children}</div>;
};

export default Render;
