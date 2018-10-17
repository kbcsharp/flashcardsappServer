module.exports = function(sequelize, DataTypes) {
  return sequelize.define("note", {
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    owner: {
      type: DataTypes.INTEGER
    }
  });
};