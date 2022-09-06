import React, {ReactNode} from "react";

interface Props {
  text?: ReactNode,
  children?: ReactNode;
  width?: number;
}

const Render: React.FC<Props> = (props) => {
  const {width = 100, text, children} = props;
  return <div style={{minWidth: width,}}>{text || children}</div>;
};

export default Render;
