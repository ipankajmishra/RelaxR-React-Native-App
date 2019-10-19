import React from 'react';

export const Column = props => (
  <div className={"col" + props.styles}>
    {props.children}
  </div>
);
