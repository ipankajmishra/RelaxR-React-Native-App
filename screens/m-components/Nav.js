import React from 'react';

export const Nav = props => (
  <nav>
    <div className="nav-wrapper blue">
      <a className="brand-logo center">{props.title}</a>
    </div>
  </nav>
);
