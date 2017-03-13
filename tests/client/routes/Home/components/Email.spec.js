import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { Email } from 'routes/Home/components/Email';
import { shallow } from 'enzyme';

describe('(Component) Email', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      mail : { from: 'test@gmail.com', errors: [] },
      ...bindActionCreators({
        setEmail : (_spies.setEmail = sinon.spy()),
        subscribe   : (_spies.subscribe = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };
    _wrapper = shallow(<Email {..._props} />);
  });

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true);
  });

  it('Should render with an <h1> that includes Title.', () => {
    expect(_wrapper.find('h1').text()).to.match(/Send Simple Email to Anyone/);
  });

  it('Should render props.email in textfield.', () => {
    expect(_wrapper.find(TextField).first().prop('value')).to.match(/test@gmail.com/);
    _wrapper.setProps({ mail: { from: 'mock@gmail.com' } });
    expect(_wrapper.find(TextField).first().prop('value')).to.match(/mock@gmail.com/);
  });

  it('should render general error ', () => {
    _wrapper.setProps({ mail: { generalError: { message: 'Failed' } } });
    expect(_wrapper.find('p').text()).to.match(/Failed/);
  });

  it('Should render email success.', () => {
    _wrapper.setProps({ mail: { success: true } });
    expect(_wrapper.find('h3').text()).to.match(/Email successfully sent/);
  });

  it('Should render textfield with hintText Email', () => {
    expect(_wrapper.find(TextField).first().prop('hintText')).to.match(/From/);
  });

  it('Should render exactly one button.', () => {
    expect(_wrapper.find(FlatButton)).to.have.length(1);
  });

  describe('An subscribe button...', () => {
    let _button;

    beforeEach(() => {
      _button = _wrapper.find(FlatButton).last();
    });

    it('has label subscribe', () => {
      expect(_button.prop('label')).to.match(/Send/);
    });

    it('Should dispatch a `subscribe` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called;

      _button.simulate('click');

      _spies.dispatch.should.have.been.called;
      _spies.subscribe.should.have.been.called;
    });
  });
});
