const boom = require('@hapi/boom');
const md5 = require('md5');

const registerVerify = require("./utils/registerSchema");
const { User } = require("../../database/models");

const validateParams = (name, email, password) => {
  const { error } = registerVerify.validate({name, email, password});
  if (error) throw error;
};

const findUserExists = async (email) => {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw boom.conflict('Email already registered');
};

const registerNewUser = async (payload) => {
  const { name, email } = payload;
  let { password } = payload;
  validateParams(name, email, password);
  
  await findUserExists(email);

  password = md5(password);

  const result = await User.create({name, email, password, role: 'customer'});

  console.log(result);
  return result;
};

module.exports = {
  registerNewUser,
};