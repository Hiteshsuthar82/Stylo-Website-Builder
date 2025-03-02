// import nodemailer from 'nodemailer';
// // Email sending function
//  const sendEmail = async (to, subject, text) => {
//     try {
//       let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "shinchankifamily@gmail.com", // Replace with your email
//           pass: process.env.APP_PASSWORD, // Replace with your generated app password
//         },
//       });
  
//       let mailOptions = {
//         from: "shinchankifamily@gmail.com",
//         to,
//         subject,
//         text,
//       };
  
//       await transporter.sendMail(mailOptions);
//       console.log("Email sent successfully");
//     } catch (error) {
//       console.error("Email sending failed:", error);
//     }
//   };

//   export default sendEmail;




import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shinchankifamily@gmail.com", // Replace with your email
    pass: process.env.APP_PASSWORD, // Use app password
  },
});

// Function to compile Handlebars template
const compileTemplate = (templateName, context) => {
  const filePath = path.join(process.cwd(), "src/views", `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf-8");
  const template = handlebars.compile(source);
  return template(context);
};

// Email sending function
const sendEmail = async (to, subject, templateName, context) => {
  try {
    const html = compileTemplate(templateName, context); // Load and compile template

    let mailOptions = {
      from: "shinchankifamily@gmail.com",
      to,
      subject,
      html, // Send as HTML
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

export default sendEmail;
