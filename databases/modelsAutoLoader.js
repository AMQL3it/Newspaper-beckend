const sequelize = require("./config");
const Member = require("../models/memberModel");
const Field = require("../models/fieldModel");
const Building = require("../models/buildingModel");
const Room = require("../models/roomModel");
const Newspaper = require("../models/newspaperModel");

exports.connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection successfully.');
      return sequelize; 
    } catch (error) {
      console.error('Unable to connect to the database:',error);
      throw error; 
    }
};

const Models = {
    'members': Member,
    'fields': Field,
    'buildings': Building,
    'rooms': Room,
    'newspapers': Newspaper
};

exports.modelsAutoLoader = async () => {
    try {
      for (const modelName in Models) {
        await Models[modelName].sync();
        console.log(`${modelName} table created successfully.`);
      }
    } catch (error) {
      console.error('Unable to create tables:', error);
      throw error; 
    }
}
