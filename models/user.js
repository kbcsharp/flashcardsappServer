module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING
      // isEmail: true,
      // unique: true,
      // notNull: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
};
