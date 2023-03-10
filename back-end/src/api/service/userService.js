const { user } = require('../../database/models');

const listUsers = async () => {
  const users = await user.findAll();
  return users;
};

const listUsersByRole = async (role) => user.findAll({ where: { role } });

const deleteUser = async (id) => {
  const deletedUser = await user.destroy(
    { where: { id } },
  );

  return deletedUser;
};

module.exports = {
  listUsers,
  listUsersByRole,
  deleteUser,
};
