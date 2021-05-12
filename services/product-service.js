const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  getCount: async function(){
    try{
      const count = await db.Product.count();
      return count;
    }catch(error){
      throw error;
    }
  },
 
  list: async function(pager,optionVal){
    try{
      let order = null;
      if(optionVal==="번호순"){   
        order=[["p_id","DESC"]]
        }
      else if(optionVal==="재고순"){   
        order=[["p_stock","ASC"]]
        }
      const products = await db.Product.findAll({
        where: {"p_enabled":1},
        order, 
        limit:pager.rowsPerPage,    
        offset:pager.startRowIndex
      });
      return products;
    }catch(error){
      throw error;
    }
  },
  getProduct: async function(p_id){
    try{
        console.log(db.Size);
      const product = await db.Product.findOne({
          where:{p_id},
          include:[{
              model:db.Photo
          },{
            model:db.Size,
          }]
      });
      return product;
  }catch(error){
      throw error;
  }
  },
  create: async function(product){
    try{
        const row = await db.Product.create(product);
        return row;
    }catch(error){
        throw error;
    }
  },
  update: async function(product){
    try{
        const row = await db.Product.update({
            p_name:product.p_name,
            p_price:product.p_price,
            p_stock:product.p_stock,
            p_category_name:product.p_category_name,
            p_description:product.p_description
        },{
            where:{p_id:product.p_id}
        });
        return row;
    }catch(error){
        throw error;
    }
  },
  delete: async function(p_id){
    try{
        const row = await db.Product.update({
            p_enabled:0
        },{
            where:{p_id}
        });
        return row;
    }catch(error){
        throw error;
    }
  },


}