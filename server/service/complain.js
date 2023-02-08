const { cloudinary } = require("../utils/cloudinary");

const {
  createNewComplain,
  findComplainByProperty,
} = require("./complainsFunc");

const complainService = async ({
  citizen_id,
  address,
  ward,
  description,
  imgUrls,
  complainType,
  phone,
  category,
}) => {
  try {
    const promises = [];
    const attachment = [];
    await imgUrls.forEach((img) => {
      promises.push(
        cloudinary.uploader.upload(img, {
          folder: "cms-app",
        })
      );
    });
    const responses = await Promise.all(promises);
    if (responses) {
      responses.forEach((response) =>
        attachment.push({
          public_id: response.public_id,
          url: response.url,
        })
      );
    }
    if (attachment) {
      return await createNewComplain({
        citizen_id,
        address,
        ward,
        description,
        attachment,
        complainType,
        category,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const classifyComplain = (description) => {
//   natural.LogisticRegressionClassifier.load(
//     "classifier.json",
//     null,
//     function (err, classifier) {
//       return classifier.classify(description);
//     }
//   );
// };

module.exports = {
  complainService,
  // classifyComplain,
};
