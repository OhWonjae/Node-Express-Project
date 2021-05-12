const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  create: async function(size){
    try{
        const row = await db.Size.create(size);
        return row;
    }catch(error){
        throw error;
    }
  },
  delete: async function(p_id){
    try{
        const row = await db.Size.destroy({
            where:{p_id}
        });
        return row;
    }catch(error){
        throw error;
    }
  },


}