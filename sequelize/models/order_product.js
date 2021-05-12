const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Order_Product extends Model{
        static associate(models){
          models.Order_Product.belongsTo(models.Order_Product,{foreignKey:"order_id", targetKey:"order_id"});
          models.Order_Product.hasOne(models.Product,{foreignKey:"p_id", sourceKey:"p_id"});
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Order_Product.init({
        order_id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        p_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        amount:{
          type: DataTypes.INTEGER,
          allowNull:false
        }

       
    },{
        sequelize,
        modelName:"Order_Product",
        tableName:"order_products",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Order_Product;
};