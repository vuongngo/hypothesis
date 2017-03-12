import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../../components/Header';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div className="container text-center">
      <Header />
      <div className="core-layout__viewport">
        {children}
      </div>
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
