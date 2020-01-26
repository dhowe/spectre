import { Mailer } from 'nodemailer-react'
import Password from './Password'

export default function sendEmail() {

  const mailerConfig = {
    defaults: {
      from: {
        name: 'Spectre Knows',
        address: 'spectre@spectreknows.me',
      },
    },
    transport: {
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b9a44e58db6c85",
        pass: "17700f1f394508"
      }
    }
  };

  const emailsList = { pass: Password };

  const mailer = Mailer(mailerConfig, emailsList);

  mailer.send('pass', {
    firstName: 'Mathieu',
    lastName: 'Tudisco',
    brand: 'Linkvalue',
    newAccount: true,
    password: Math.random().toString(36).substring(7),
  }, {
      to: 'foo@bar.fr',
      attachments: [{ content: 'bar', filename: 'foo.txt' }],
    })
}
