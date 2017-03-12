import React from 'react';
import AppBar from 'material-ui/AppBar';
import './Header.scss';

export const Header = () => (
  <AppBar
    className="transparent-app-bar"
    title="Hypothesis"
    iconClassNameLeft="None"
  />
);

export default Header;
