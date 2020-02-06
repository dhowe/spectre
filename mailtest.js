import Mailer from './mailer';
import dotEnv from 'dotenv';

dotEnv.config();

const mailer = new Mailer({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

mailer.sendMessage();
