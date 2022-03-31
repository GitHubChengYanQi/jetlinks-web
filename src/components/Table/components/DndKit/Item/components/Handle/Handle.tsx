import React from 'react';

import {Action, ActionProps} from '../Action';

export function Handle(props: ActionProps) {

  return (
    <Action cursor="grab" data-cypress="draggable-handle" {...props}>
      {props.icon || <svg viewBox="0 0 20 20" width="12">
        <path
  d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
      </svg>}
    </Action>
  );
}
