const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  getCount: async function(review_score,searchType,searchContent){
    try{
      let where = null;
      if(review_score===0 && searchContent==null){   
          where={
            [Op.and]:[
              {"enabled":1}
            ]
          }
        }
        else if(searchType==null&&searchContent==null){
          where={
            "enabled":1,
             "review_score":review_score
          }
        }else{
          if(searchType ==="리뷰내용"){
            where={
              [Op.and]:[
                {"review_content":{[Op.like]:"%" + searchContent + "%"}},
                {"enabled":1}
              ]
            }
          }else if(searchType ==="리뷰제목"){
            where={
              [Op.and]:[
                {"review_title":{[Op.like]:"%" + searchContent + "%"}},
                {"enabled":1}
              ]
            }
          }else{
            where={
              [Op.and]:[
                {"user_id":{[Op.like]:"%" + searchContent + "%"}},
                {"enabled":1}
              ]
            }
          }
        }
      const count = await db.Review.count({
        where
      });
      return count;
    }catch(error){
      throw error;
    }
  },
 
  list: async function(pager,review_score,searchType,searchContent){
    try{
      let where = null;
      if(review_score===0 && searchContent==null){   
        where={
          [Op.and]:[
            {"enabled":1}
          ]
        }
      }
      else if(searchType==null&&searchContent==null){
        where={
          "enabled":1,
           "review_score":review_score
        }
      }else{
        if(searchType ==="리뷰내용"){
          where={
            [Op.and]:[
              {"review_content":{[Op.like]:"%" + searchContent + "%"}},
              {"enabled":1}
            ]
          }
        }else if(searchType ==="리뷰제목"){
          where={
            [Op.and]:[
              {"review_title":{[Op.like]:"%" + searchContent + "%"}},
              {"enabled":1}
            ]
          }
        }else{
          where={
            [Op.and]:[
              {"user_id":{[Op.like]:"%" + searchContent + "%"}},
              {"enabled":1}
            ]
          }
        }
      }
      const reviews = await db.Review.findAll({
        where,
        order:[["review_id","DESC"]],
        limit:pager.rowsPerPage,    
        offset:pager.startRowIndex
      });
      return reviews;
    }catch(error){
      throw error;
    }
  },



  getReview: async function(review_id){
    try{
        const review = await db.Review.findOne({
            where:{review_id},
        });
        return review;
    }catch(error){
        throw error;
    }
  },
  update: async function(review){
    try{
        const row = await db.Review.update({
            review_title:review.review_title,
            review_content:review.review_content,
        },{
            where:{review_id:review.review_id}
        });
        return row;
    }catch(error){
        throw error;
    }
},
};