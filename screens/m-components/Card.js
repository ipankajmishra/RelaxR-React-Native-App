import React from 'react';

export const Card = props => (
  <div className="card blue darken-1">
    <div className="card-content white-text flow-text">
      <i className="material-icons">tag_faces</i> {props.children}
    </div>
  </div>
);
