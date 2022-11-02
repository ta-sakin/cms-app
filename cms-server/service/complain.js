const { cloudinary } = require("../utils/cloudinary");
const {
  createNewComplain,
  findComplainByProperty,
} = require("./complainsFunc");

const complainService = async ({
  address,
  ward,
  description,
  imgUrls,
  complainType,
  phone,
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
    const user = await findComplainByProperty("phone", phone);
    if (attachment && user) {
      return await createNewComplain({
        citizen_id: user._id,
        address,
        ward,
        description,
        attachment,
        complainType,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  complainService,
};
