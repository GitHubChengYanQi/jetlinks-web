import React, {ReactNode} from 'react';

interface Props {
  text?: ReactNode,
  children?: ReactNode;
  className?: string;
  width?: number;
  onClick?: any;
  style?: any;
}

const Render: React.FC<Props> = (props) => {
  const {
    width = 100,
    text,
    style = {},
    children,
    className,
    onClick = () => {
    }
  } = props;
  return <div
    className={className}
    style={{minWidth: width, display: 'inline-block', ...style}}
    onClick={onClick}>{text || children}</div>;
};

export default Render;
