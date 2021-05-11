const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  getCount: async function(qa_category,keyword){
    try{
      let where = null;
      if(qa_category==="전체" && keyword!=null){   
        where={
            "user_id":{[Op.like]:"%" + keyword + "%"}
          }
        }
        else if((qa_category==="상품 문의" || qa_category==="배송 문의"|| qa_category==="주문/결제 문의" ) && keyword==null){
          where={
             "qa_category":qa_category
          }
        }else if((qa_category==="답변 대기" || qa_category==="답변 완료" ) && keyword==null){
          where={
             "qa_status":qa_category
          }
        }else if((qa_category==="배송 문의" || qa_category==="주문/결제 문의" || qa_category==="상품 문의" ) && keyword!=null){
            where={
              "user_id":{[Op.like]:"%" + keyword + "%"},
              "qa_category":qa_category
            }
        }else if((qa_category==="답변 대기" || qa_category==="답변 완료" ) && keyword!=null){
          where={
            "user_id":{[Op.like]:"%" + keyword + "%"},
            "qa_status":qa_category
          }
      }
      const count = await db.Qna.count({
        where
      });
      return count;
    }catch(error){
      throw error;
    }
  },
 
  list: async function(pager,qa_category,keyword){
    try{
      let where = null;
      console.log(qa_category);
      console.log(keyword);
      if(qa_category==="전체" && keyword!=null){   
        where={
            "user_id":{[Op.like]:"%" + keyword + "%"}
          }
        }
        else if((qa_category==="상품 문의" || qa_category==="배송 문의"|| qa_category==="주문/결제 문의" ) && keyword==null){
          where={
             "qa_category":qa_category
          }
        }else if((qa_category==="답변 대기" || qa_category==="답변 완료" ) && keyword==null){
          where={
             "qa_status":qa_category
          }
        }else if((qa_category==="배송 문의" || qa_category==="주문/결제 문의" || qa_category==="상품 문의" ) && keyword!=null){
            where={
              "user_id":{[Op.like]:"%" + keyword + "%"},
              "qa_category":qa_category
            }
        }else if((qa_category==="답변 대기" || qa_category==="답변 완료" ) && keyword!=null){
          where={
            "user_id":{[Op.like]:"%" + keyword + "%"},
            "qa_status":qa_category
          }
      }
      const qnas = await db.Qna.findAll({
        where,
        order:[["qa_id","DESC"]], 
        limit:pager.rowsPerPage,    
        offset:pager.startRowIndex
      });
      return qnas;
    }catch(error){
      throw error;
    }
  },
  getQna: async function(qa_id){
    try{
      const qna = await db.Qna.findOne({
          where:{qa_id}
      });
      return qna;
  }catch(error){
      throw error;
  }
  },
  update: async function(qna){
    try{
        const row = await db.Qna.update({
            qa_category:qna.qa_category,
            qa_content:qna.qa_content,
            qa_status:qna.qa_status,
            qa_cn:qna.qa_cn,
            user_id:qna.user_id,
            qa_answer:qna.qa_answer,
            qa_admin:qna.qa_admin,
        },{
            where:{qa_id:qna.qa_id}
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