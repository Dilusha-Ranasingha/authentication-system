import { MailtrapClient } from "mailtrap";   
import dotenv from "dotenv";                 

dotenv.config();    // Load the environment variables from the .env file

const client = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT, token: process.env.MAILTRAP_TOKEN });     

const sender = {                   
  email: "hello@demomailtrap.com",
  name: "Dilusha",
};
const recipients = [
  {
    email: "dilushar10@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);