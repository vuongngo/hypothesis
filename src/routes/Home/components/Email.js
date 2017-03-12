import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './Email.scss';
// Helpers
import { getError, getValue } from '../../../utils/fetch';

export const Email = (props) => {
  const generalError = getValue(props.mail, ['generalError', 'message']);
  return (
    <div className="email-wrapper">
      <h1>Be the first one reading our Newsletter</h1>
      { generalError ? <p>{generalError}</p> : null }
      {
        props.mail.success ? <h3>Email successfully sent!</h3> : <div className="email-form">
          <TextField
            hintText="Email"
            value={props.mail.email}
            errorText={getError(props.mail.errors, 'email')}
            onChange={props.setEmail}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            />
          <FlatButton
            label="Subscribe"
            style={style.btn}
            secondary
            onClick={props.subscribe} />
        </div>
      }
    </div>
  );
};

Email.propTypes = {
  mail: React.PropTypes.object,
  setEmail: React.PropTypes.func.isRequired,
  subscribe: React.PropTypes.func.isRequired
};

const style = {
  btn: {
    marginTop: 20
  },
  hint: {
    color: '#000000'
  },
  underline: {
    borderColor: '#000000'
  }
};

export default Email;
