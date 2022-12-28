const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

function mailSchema(mongoose, collection) {
    mailModel = mongoose.Schema({
        content: { type: String, require: true },
        email: {type: String},
        expireAt: { type: Date, require: false },
        checked: {type: Boolean, require: false}
    });

    var Mail = mongoose.model(collection, mailModel);
    return Mail;
}

function showMailData(Mail) {
    Mail.find({"checked":false})
        .sort("-expireAt")
        .exec(function (err, mails) {
            console.log("show...");
            console.log(mails);
            for (let mail of mails) {
                if (
                    Date.now() + KR_TIME_DIFF >
                    mail.expireAt
                ) {
                    console.log(mail + " deleted!");
                    sendMailData(mail.email, Mail, mail.id);
                }
		console.log(Date.now() + KR_TIME_DIFF)
		console.log(mail.expireAt)
            }
        });
}

var sendmail = require("./sendmail");

async function sendMailData(mail_id, Mail, id) {
   sendmail.sendMail(mail_id)
   console.log(id, mail_id)
   const res = await Mail.updateOne({ _id: id}, {"checked":true})
   console.log(res)
}

exports.mailSchema = mailSchema;
exports.showMailData = showMailData;