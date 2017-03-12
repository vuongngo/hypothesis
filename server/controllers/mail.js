import { checkEmail } from '../helpers/validation';
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
  const email = req.body.email;
  if (!checkEmail(email)) res.status(400).json({ message: 'Invalid email' });
  const settings = {
    to: email,
    subject: 'Test Hypothesis',
    contentType: 'text/plain',
    content: 'Simple email test'
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
