const createTokenUser = (user) => {
    return { name: user.name, surname: user.surname, userId: user._id, role: user.role };
  };
  
  module.exports = createTokenUser;
  