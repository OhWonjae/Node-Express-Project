const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Size extends Model{
        static associate(models){
            models.Size.belongsTo(models.Product,{foreignKey:"p_id", targetKey:"p_id"});
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Size.init({
        p_size:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        p_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        
    },{
        sequelize,
        modelName:"Size",
        tableName:"size_products",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Size;
};