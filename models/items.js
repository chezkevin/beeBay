module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Giving the Item model a name of type STRING
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING
    },
    starting_bid: {
      type: DataTypes.DECIMAL(10,2)
    },
    highest_bid: {
      type: DataTypes.DECIMAL(10,2)
    },
    highest_bid_owner: {
      type: DataTypes.STRING
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Item to have an Owner
      classMethods: {
        associate: function(models) {
          // Associating Item with an Owner
          // When an Owner is deleted, also delete any associated Posts
          Item.belongsToMany(models.User, {});
        }
      }
    }
  );
  return Item;
};
