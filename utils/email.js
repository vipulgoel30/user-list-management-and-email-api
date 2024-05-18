// Third party imports
import { createTransport } from "nodemailer";
import { promisify } from "util";
import retry from "./retry.js";
import jwt from "jsonwebtoken";

let transporterOptions;
if (process.env.NODE_ENV === "prod") {
  const { NODEMAILER_SERVICE_PROD, NODEMAILER_HOST_PROD, NODEMAILER_AUTH_USER_PROD, NODEMAILER_AUTH_PASS_PROD } =
    process.env;
  transporterOptions = {
    service: NODEMAILER_SERVICE_PROD,
    host: NODEMAILER_HOST_PROD,
    auth: {
      user: NODEMAILER_AUTH_USER_PROD,
      pass: NODEMAILER_AUTH_PASS_PROD,
    },
  };
} else {
  const { NODEMAILER_PORT_DEV, NODEMAILER_HOST_DEV, NODEMAILER_AUTH_USER_DEV, NODEMAILER_AUTH_PASS_DEV } = process.env;
  transporterOptions = {
    port: NODEMAILER_PORT_DEV,
    host: NODEMAILER_HOST_DEV,
    auth: {
      user: NODEMAILER_AUTH_USER_DEV,
      pass: NODEMAILER_AUTH_PASS_DEV,
    },
  };
}

let transporter = undefined;
retry(
  async () => {
    transporter = createTransport({ ...transporterOptions, pool: true, maxConnections: 20, maxMessages: 200 });
    return await promisify(transporter.verify)();
  },
  1000,
  500,
  10000
);

const from = process.env.NODEMAILER_FROM;
const URL = process.env.URL;
const sendMailHandler = async (user, listID, emailTemplate) => {
  const unsubscribeToken = await promisify(jwt.sign)({ id: user._id, list: listID }, process.env.JWT_SECRET);

  const template = `<html>
  <body>
  <p>${emailTemplate}</p>
  <a href='${URL}/user/unsubscribe?token=${unsubscribeToken}'>Unsubscribe </a> Link
  </body>
  </html>
  `;

  if (transporter) {
    const html = template.replace(new RegExp(`\\[(${Object.keys(user).join("|")})\\]|\\n`, "g"), (match, group) => {
      if (match === "\n") return "<br/>";
      return user[group];
    });

    return retry(
      () => transporter.sendMail({ from, subject: "Welcome to mathongo!!!", to: user.email, html: html }),
      3,
      100,
      1000
    );
  }
  return undefined;
};

export default sendMailHandler;
