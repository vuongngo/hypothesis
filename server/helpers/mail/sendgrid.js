import request from 'request';

/*
 * Concrete Mail class with Sendgrid
 * Send email through resful api
 */
export default class SendgridTransport {
  constructor(config) {
    this.options = {
      uri: config.endpoint,
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json'
      }
    };
    this.from = config.defaultFrom;
    this.send = this.send.bind(this);
  }

  // Promisify send method
  send(mailOptions) {
    const body = {
      personalizations: [
        {
          to: this.sendDes(mailOptions.to),
          subject: mailOptions.subject
        }
      ],
      from: {
        email: mailOptions.from || this.from
      },
      content: [
        {
          type: mailOptions.contentType,
          value: mailOptions.content
        }
      ]
    };

    // CC
    if (mailOptions.cc) {
      body.personalization[0].cc = this.sendDes(mailOptions.cc);
    }

    // BCC
    if (mailOptions.bcc) {
      body.personalization[0].bcc = this.sendDes(mailOptions.bcc);
    }

    this.options.body = JSON.stringify(body);
    return new Promise((resolve, reject) => {
      request.post(this.options, (error, response, body) => {
        if (error) return reject(error);
        return resolve({ response, body });
      });
    });
  }

  sendDes(des) {
    // Eg ['a@mail', 'b@mail']
    if (des instanceof Array) {
      return des.map((x) => {email: x});
    }
    return [{email: des}];
  }
};

