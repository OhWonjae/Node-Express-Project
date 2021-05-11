const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class User extends Model{
        static associate(models){
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    User.init({
        user_id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        user_password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        user_phone:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dog_size:{
            type: DataTypes.STRING,
            allowNull:true
        },
        enabled : {
            type: DataTypes.DECIMAL,
            allowNull:false
        },
        authority:{
            type: DataTypes.STRING,
            allowNull:false
        }
      
    },{
        sequelize,
        modelName:"User",
        tableName:"users",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return User;
};