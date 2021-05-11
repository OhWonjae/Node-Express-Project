const bcrypt = require("bcrypt");
const db = require("../sequelize/models");
const Op = db.Sequelize.Op;
module.exports = {
  login: async function(user){
    try{
      const dbUser = await db.User.findOne({
       where:{user_id:user.uid}
      });
     let result = {};
     if(dbUser){
        const passwordCheck = await bcrypt.compare(user.upassword, dbUser.user_password);
        if(passwordCheck){
          console.log("로그인성공");
          result = {id :"success",message:"로그인 성공"}; 
        }else{         
          console.log("패스워드 틀림");
          result = {id :"wrongUserPassword",message:"패스워드가 틀립니다."}; 
        }
     } else{
       
      console.log("아이디 틀림");
      result = {id:"wrongUserid",message:"아이디가 존재하지 않습니다."};
     }
     return result;
    }catch(error){
      throw error;
    }
  },
  getCount: async function(keyword){
    try{
      let where = null;
      if(keyword){   
          where={
            [Op.and]:[
              {"user_id":{[Op.like]:"%" + keyword + "%"}},
              {"enabled":1},
              {"authority":"ROLE_USER"}
            ]
          }
        }
        else{
          where={
            "enabled":1,
            "authority":"ROLE_USER"
          }
        }
      const count = await db.User.count({where});
      return count;
    }catch(error){
      throw error;
    }
  },
  list: async function(pager,keyword){
    try{
        let where = null;
        if(keyword){   
            where={
              [Op.and]:[
                {"user_id":{[Op.like]:"%" + keyword + "%"}},
                {"enabled":1},
                {"authority":"ROLE_USER"}
              ]
            }
          }
          else{
            where={
              "enabled":1,
              "authority":"ROLE_USER"
            }
          }
        const result = await db.User.findAll({
            where,
            order:[["user_id","DESC"]],
            limit:pager.rowsPerPage,    
            offset:pager.startRowIndex
        });
            
        return result;
    }catch(error){
        throw error;
    }
  },

  getUser: async function(user_id){
    try{
        const result = await db.User.findOne({
            where:{user_id},
        });
        return result;
    }catch(error){
        throw error;
    }
  },
  update: async function(user){
    try{
      console.log(user);
        const row = await db.User.update({
            user_name:user.user_name,
            user_phone:user.user_phone,
            dog_size:user.dog_size
        },{
            where:{user_id:user.user_id}
        });
        return row;
    }catch(error){
        throw error;
    }
},
};