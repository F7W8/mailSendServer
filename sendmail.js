const nodemailer = require('nodemailer');
const schedule = require("node-schedule");
require("dotenv").config();

const sendMail = async(mail_id) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",  // 이메일
        auth: {
            user: process.env.MAIL_ID,  // 발송자 이메일
            pass: process.env.MAIL_PASSWORD,  // 발송자 비밀번호
        },
    });
    console.log("mail_id : " ,mail_id)
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: mail_id,
        subject: "종이 비행기가 도착했습니다!",
        html: `<h1>종이 비행기가 도착했습니다!</h1>
                <div>
                  당신이 날렸던 비행기가 이곳저곳을 여행하다가 다시 당신에게 돌아왔습니다! <br>
                  지금 확인하실 수 있습니다! <br>
                  <a href='http://localhost:3000/airplane/storage'>비행기 보관함에 가보기</a>
                </div>`,
        text: "종이 비행기 알림.",
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
}

exports.sendMail = sendMail;