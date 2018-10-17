module.exports = function(sequelize, DataTypes) {
  return sequelize.define("card", {
    answer: {
      type: DataTypes.STRING
    },
    question: {
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