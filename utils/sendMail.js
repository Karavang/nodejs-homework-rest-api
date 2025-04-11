const Elastic = require("@elasticemail/elasticemail-client");
const { EMAILFROM, ELASTICKEY } = process.env;
const defaultClient = Elastic.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICKEY;
const api = new Elastic.EmailsApi();
const sendEmail = async ({ to, subject, html }) => {
  const email = Elastic.EmailMessageData.constructFromObject({
    Recipients: [new Elastic.EmailRecipient(to)],
    Content: {
      Body: [
        Elastic.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: html,
        }),
      ],
      Subject: subject,
      From: EMAILFROM,
    },
  });
  const callback = function (error, data, response) {
    if (error) {
      console.error(error.message);
    } else {
      console.log("API called successfully.");
    }
  };

  api.emailsPost(email, callback);
  return true;
};
module.exports = sendEmail;
