const {Model , Sequelize}  = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    //모델 클래스 선언
    class Product extends Model{
        static associate(models){
          models.Product.belongsTo(models.Order_Product,{foreignKey:"p_id", targetKey:"p_id"});
          models.Product.hasMany(models.Photo,{foreignKey:"p_id", sourceKey:"p_id"});
          models.Product.hasMany(models.Size,{foreignKey:"p_id", sourceKey:"p_id"});
   
         }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Product.init({
        p_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        p_name:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        p_price:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        p_stock:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        p_salescount:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        p_category_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        p_upload_date:{
            type: DataTypes.DATE,
            allowNull:false
        },
        p_description:{
            type: DataTypes.STRING,
            allowNull:false
        },
        p_rate:{
            type: DataTypes.INTEGER,
        },
        p_enabled:{
            type: DataTypes.DECIMAL,
            allowNull:false
        },
       
    },{
        sequelize,
        modelName:"Product",
        tableName:"products",
        timestamps:false, //createAt 과 updateAt 컬럼을 사용안함
    });
    return Product;
};