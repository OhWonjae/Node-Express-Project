const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Qna extends Model{
        static associate(models){
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Qna.init({
        qa_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        qa_category:{
            type: DataTypes.STRING,
            allowNull:false
        },
        qa_content:{
          type: DataTypes.STRING,
          allowNull:false
        },
        qa_status:{
          type: DataTypes.STRING,
          allowNull:false
        },
        qa_date:{
          type: DataTypes.DATE,
          allowNull:false
        },
        qa_cn:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        qa_answer:{
          type: DataTypes.STRING,
        },
        qa_admin:{
          type: DataTypes.STRING,
        },
        user_id:{
          type: DataTypes.STRING,
          allowNull:false
        }
    },{
        sequelize,
        modelName:"Qna",
        tableName:"qna",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Qna;
};