const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  create: async function(photo){
    try{
        const row = await db.Photo.create(photo);
        return row;
    }catch(error){
        throw error;
    }
  },
  delete: async function(photo_id){
    try{
        const row = await db.Photo.destroy({
          where:{photo_id}
        });
        return row;
    }catch(error){
        throw error;
    }
  },
}