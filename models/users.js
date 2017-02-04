module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model an id of type INTEGER
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Giving the User model a username of type STRING
    name: {
      type: DataTypes.STRING
    },
    // Giving the User Model a password of type STRING
    password: {
      type: DataTypes.STRING
    },
    // Giving the User Model a password of type INTEGER
    itemBids: {
      type: DataTypes.INTEGER
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our User to have Items
      classMethods: {
        associate: function(models) {
          // Associating User with bids
          // When an User is deleted, also delete any associated items and bids
          User.hasMany(models.Item, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};
