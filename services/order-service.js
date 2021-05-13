const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  getCount: async function(keyword,searchStatus){
    try{
      let where = null;
      if(searchStatus==null && keyword!=null){   
        where={
            "order_name":{[Op.like]:"%" + keyword + "%"}
          }
        }
      else if(searchStatus!=null && keyword==null){   
        where={
            "delivery_status":searchStatus
          }
        }
      else if(searchStatus!=null && keyword==null){   
        where={
              "order_name":{[Op.like]:"%" + keyword + "%"},
              "delivery_status":searchStatus
          }
        }
      const count = await db.Order.count({
        where
      });
      return count;
    }catch(error){
      throw error;
    }
  },
 
  list: async function(pager,keyword,searchStatus){
    try{
      let where = null;
      if(searchStatus==null && keyword!=null){   
        where={
            "order_name":{[Op.like]:"%" + keyword + "%"}
          }
        }
      else if(searchStatus!=null && keyword==null){   
        where={
            "delivery_status":searchStatus
          }
        }
      else if(searchStatus!=null && keyword!=null){   
        where={
              "order_name":{[Op.like]:"%" + keyword + "%"},
              "delivery_status":searchStatus
          }
        }
      const orders = await db.Order.findAll({
        where,
        order:[["order_date","DESC"]], 
        limit:pager.rowsPerPage,    
        offset:pager.startRowIndex
      });
      return orders;
    }catch(error){
      throw error;
    }
  },
  getReadyCount: async function(){
    try{
      const order = await db.Order.count({
          where:{delivery_status:"배송준비중"},       
      });
      return order;
  }catch(error){
      throw error;
  }
  },
  getOrder: async function(order_id){
    try{
      const order = await db.Order.findOne({
          where:{order_id},
          include:[{
            model:db.Order_Product,
            include:[{
              model:db.Product,
              include:[{
                model:db.Photo,
              }]
            }]
          }]
      });
      return order;
  }catch(error){
      throw error;
  }
  },
  update: async function(order){
    try{
        const row = await db.Order.update({
            delivery_status:order.delivery_status
        },{
            where:{order_id:order.order_id}
        });
        return row;
    }catch(error){
        throw error;
    }
  },
  delete: async function(qa_id){
    try{
        const row = await db.Qna.destroy({
            where:{qa_id}
        });
        return row;
    }catch(error){
        throw error;
    }
  },


}