import SendgridTransport from './sendgrid';
import MailgunTransport from './mailgun';

/*
  * Mail abstraction
  */
export default class MailTransport {
  constructor(config) {
    this.sendgrid = new SendgridTransport(config.sendgrid);
    this.mailgun = new MailgunTransport(config.mailgun);
    this.send = this.send.bind(this);
  }

  // Try to send email with sendgrid
  // Fallback to mailgun
  send(options) {
    return new Promise((resolve, reject) => {
      this.sendgrid.send(options)
        .then(({ response, body }) => {
          if (response.statusCode !== 202) {
            return this.mailgun.send(options);
          }
          resolve('Email successfully sent');
        })
        .catch((err) => {
          console.log(err);
          return this.mailgun.send(options);
        })
        .then(({ response, body }) => {
          if (response.statusCode >= 300) {
            reject(new Error(body.message));
          }
          resolve(body.message);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
