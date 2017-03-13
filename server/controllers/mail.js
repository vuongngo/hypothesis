import { checkEmail, checkMultipleEmails, checkLength } from '../helpers/validation';
import express from 'express';
import MailTransport from '../helpers/mail';
import project from '../../config/project.config';
import varConfig from '../config/index';

const router = express.Router();

// Get configuration for the right env
let config;
if (project.env === 'production') {
  config = varConfig.production;
} else {
  config = varConfig.development;
}

// Initialize EmailClient
export const emailClient = new MailTransport(config);
/*
  * Send test email
  * Endpoint: /api/mail
  *
  */
router.post('/', function(req, res) {
  const { from, to, cc, bcc, subject, body } = req.body;
  const errors = [];
  if (!checkEmail(from)) errors.push('Invalid email from');
  if (!checkMultipleEmails(to)) errors.push('Invalid email to');
  if (cc) {
    if (!checkMultipleEmails(cc)) errors.push('Invalid email cc');
  }
  if (bcc) {
    if (!checkMultipleEmails(bcc)) errors.push('Invalid email bcc');
  }
  if (!checkLength(subject, 10)) errors.push('Subject must be more than 10 characters');
  if (!checkLength(body)) errors.push('Body must be more than 20 characters');

  if (errors.length > 0) {
    res.status(400).json({ message: errors.reduce((prev, cur) => prev + '. ' + cur) });
  }

  const settings = {
    from: from,
    to: to,
    cc: cc,
    bcc: bcc,
    subject: subject,
    contentType: 'text/plain',
    content: body
  };
  emailClient.send(settings)
    .then((mes) => {
      return res.status(202).json({ message: mes });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to send email' });
    });
});

export default router;
