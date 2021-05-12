const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Review extends Model{
        static associate(models){
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Review.init({
        review_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        review_score:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        review_title:{
            type: DataTypes.STRING,
            allowNull:false
        },
        review_content:{
          type: DataTypes.STRING,
          allowNull:false
        },
        review_date:{
          type: DataTypes.DATE,
          allowNull:false
        },
        p_id:{
            type: DataTypes.INTEGER,
        },
        photo_oname:{
          type: DataTypes.STRING,
          defaultValue:null
        },
        photo_sname:{
          type: DataTypes.STRING,
          defaultValue:null
        },
        photo_type:{
          type: DataTypes.STRING,
          defaultValue:null
        },
        enabled:{
          type: DataTypes.DECIMAL,
          allowNull:false
        },
        user_id:{
          type: DataTypes.STRING,
          allowNull:false
        },
    },{
        sequelize,
        modelName:"Review",
        tableName:"review",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Review;
};