const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Order extends Model{
        static associate(models){
          models.Order.hasMany(models.Order_Product,{foreignKey:"order_id", sourceKey:"order_id"});
  
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Order.init({
        order_id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        order_date:{
            type: DataTypes.DATE,
            allowNull:false
        },
        order_request:{
          type: DataTypes.STRING,
          defaultValue: null
        },
        total_price:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        payment:{
          type: DataTypes.STRING,
          allowNull:false
        },
        delivery_address:{
          type: DataTypes.STRING,
          allowNull:false
        },
        delivery_address_detail:{
          type: DataTypes.STRING,
          allowNull:false
        },
        zip:{
          type: DataTypes.INTEGER,
        },
        order_name:{
          type: DataTypes.STRING,
          allowNull:false
        },
        order_phone:{
          type: DataTypes.STRING,
          allowNull:false
        },
        order_sprice:{
          type: DataTypes.STRING,
          allowNull:false
        },
        delivery_status:{
          type: DataTypes.STRING,
          allowNull:false
        },
        total_amount:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        user_id:{
          type: DataTypes.STRING,
        }
    },{
        sequelize,
        modelName:"Order",
        tableName:"orders",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Order;
};