const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Photo extends Model{
        static associate(models){
          models.Photo.belongsTo(models.Product,{foreignKey:"p_id", targetKey:"p_id"});
  
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Photo.init({
        photo_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photo_oname:{
            type: DataTypes.STRING,
            allowNull:false
        },
        photo_sname:{
            type: DataTypes.STRING,
            allowNull:false
        },
        photo_type:{
            type: DataTypes.STRING,
            allowNull:false
        },
        p_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        photo_role:{
            type: DataTypes.STRING,
            allowNull:false
        },    },{
        sequelize,
        modelName:"Photo",
        tableName:"photos",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Photo;
};