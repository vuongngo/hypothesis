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
      <h1>Send Simple Email to Anyone</h1>
      { generalError ? <p>{generalError}</p> : null }
      {
        props.mail.success ? <h3>Email successfully sent!</h3> : <div className="email-form">
          <TextField
            hintText="From"
            value={props.mail.from}
            errorText={getError(props.mail.errors, 'from')}
            onChange={(e, value) => props.setEmail('from', value)}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            fullWidth
            />
          <TextField
            hintText="To"
            value={props.mail.to}
            errorText={getError(props.mail.errors, 'to')}
            onChange={(e, value) => props.setEmail('to', value)}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            fullWidth
            />
          <TextField
            hintText="CC"
            value={props.mail.cc}
            errorText={getError(props.mail.errors, 'cc')}
            onChange={(e, value) => props.setEmail('cc', value)}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            fullWidth
            />
          <TextField
            hintText="BCC"
            value={props.mail.bcc}
            errorText={getError(props.mail.errors, 'bcc')}
            onChange={(e, value) => props.setEmail('bcc', value)}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            fullWidth
            />
          <TextField
            hintText="Subject"
            value={props.mail.subject}
            errorText={getError(props.mail.errors, 'subject')}
            onChange={(e, value) => props.setEmail('subject', value)}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            fullWidth
            multiLine
            />
          <TextField
            hintText="Body"
            value={props.mail.body}
            errorText={getError(props.mail.errors, 'body')}
            onChange={(e, value) => props.setEmail('body', value)}
            hintStyle={style.hint}
            underlineStyle={style.underline}
            fullWidth
            multiLine
            />
          <FlatButton
            label="Send"
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
