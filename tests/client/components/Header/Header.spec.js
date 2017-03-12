import React from 'react';
import { Header } from 'components/Header/Header';
import { shallow } from 'enzyme';
import AppBar from 'material-ui/AppBar';

describe('(Component) Header', () => {
  let _wrapper;

  beforeEach(() => {
    _wrapper = shallow(<Header />);
  });

  it('Renders AppBar', () => {
    expect(_wrapper.type()).to.equal(AppBar);
  });

  describe('Appbar ', () => {
    it('Should render title Hypothesis', () => {
      expect(_wrapper.find(AppBar).prop('title')).to.match(/Hypothesis/);
    });
  });
});
