const error = require("../utils/error");
const { createNewUser } = require("./user");

const signUpService = async ({ name, email, phone, ward, address }) => {
  // const user = await findUserByProperty("phone", phone);
  // if (user) throw error("User already exists", 400);

  return await createNewUser({ name, email, phone, ward, address });
};
const signInService = () => {};

module.exports = {
  signUpService,
  signInService,
};
