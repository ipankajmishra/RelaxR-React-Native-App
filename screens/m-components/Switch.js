import React from 'react';

export const Switch = props => (
  <div className="switch">
    <label>
      {props.on}
        <input type="checkbox" value={props.value} onChange={props.onChange}/>
        <span className="lever"></span>
      {props.off}
    </label>
  </div>
);
