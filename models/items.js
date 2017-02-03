module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    // Giving the Item model a name of type STRING
    name: DataTypes.STRING
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Item to have an Owner
      classMethods: {
        associate: function(models) {
          // Associating Item with an Owner
          // When an Owner is deleted, also delete any associated Posts
          Item.hasMany(models.User, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Item;
};
