import request from 'request';

/*
 * Concrete Mail class with Mailgun
 * Send email through resful api
 */
export default class MailgunTransport {
  constructor(config) {
    this.options = {
      uri: config.endpoint,
      headers: {
        'Authorization': 'Basic ' + new Buffer('api:' + config.apiKey).toString('base64')
      }
    };
    this.from = config.defaultFrom;
    this.send = this.send.bind(this);
  }

  // Promisify send method
  send(mailOptions) {
    const body = {
      from: mailOptions.from || this.from,
      to: this.sendDes(mailOptions.to),
      subject: mailOptions.subject
    };

    // CC
    if (mailOptions.cc) {
      body.cc = this.sendDes(mailOptions.cc);
    }

    // BCC
    if (mailOptions.bcc) {
      body.bcc = this.sendDes(mailOptions.bcc);
    }

    if (mailOptions.contentType === 'text/html') {
      body.html = mailOptions.content;
    } else {
      body.text = mailOptions.content;
    }
    this.options.form = body;
    return new Promise((resolve, reject) => {
      request.post(this.options, (error, response, body) => {
        if (error) return reject(error);
        return resolve({ response, body });
      });
    });
  }

  sendDes(des) {
    if (!des) return;
    if (des instanceof Array) {
      return des.reduce((prev, cur) => prev + ',' + cur);
    }
    return des;
  }

};
