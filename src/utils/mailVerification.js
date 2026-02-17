import nodemailer from "nodemailer";

export async function mailVerification(email, otp) {
       try {
              const transporter = nodemailer.createTransport({
                     service: "gmail",
                     auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASS,
                     },
              });

              const mailOptions = {
                     from: `"Your App Name" <${process.env.EMAIL}>`,
                     to: email,
                     subject: "Your OTP for Registration - ExamNotes AI",
                     html: `
                     <div style="font-family: Arial, sans-serif; text-align: center;">
                     <h2 style="color: #4CAF50;">OTP Verification</h2>
                     <p>Your OTP is:</p>
                     <h1 style="letter-spacing: 3px;">${otp}</h1>
                     <p>This OTP will expire in <b>5 minutes</b>.</p>
                     </div>
                     `,
              };

              await transporter.sendMail(mailOptions);

              return true;
       } catch (error) {
              console.error("Error sending OTP:", error);
              throw new Error("Failed to send OTP email");
       }
}
