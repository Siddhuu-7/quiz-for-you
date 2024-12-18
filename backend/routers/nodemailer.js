
const nodemailer = require("nodemailer")
const sendEmail = (to, userId, password) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "quizrooms143@gmail.com",
            pass: "ggjjrsujgrviyfjj"
        }
    });

    const subject = "Test Your Skills: Take a Quiz Today!";
    const text = `Hello,\n\nWelcome to our quiz platform!\n\nWe are excited to have you on board. Here are your account details:\n\n- User ID:${userId}\nPassword:${password}\n\nPlease keep this information secure. If you have any questions, feel free to reach out to us.\n\nThank you for joining, and happy quizzing!\n\nBest regards,\nQuiz For Fou Team`;

    const options = {
        from: "node62106@gmail.com",
        to: to,
        subject: subject,
        text: text,
        replyTo: "no-reply@example.com" 
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info.response);
            }
        });
    });
};

module.exports = sendEmail;
