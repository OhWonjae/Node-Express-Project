const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const orderService = require("../services/order-service");
const paging = require("../utils/paging");
//라우터 객체 생성
const router = express.Router();


router.get("",async(req,res,next)=>{
  try{
  const keyword = req.query.keyword;
  const searchStatus = req.query.searchStatus==="전체"?null:req.query.searchStatus;
  const pageNo = req.query.pageNo?parseInt(req.query.pageNo):1;
  const totalRows =await orderService.getCount(keyword,searchStatus);

  const pager = paging.init(5,5, pageNo,totalRows);
  const orders = await orderService.list(pager,keyword,searchStatus );
  res.json({orders,pager});
}catch(error){
  console.log(error);
  next(error);
}
});

router.get("/:order_id",async(req,res,next)=>{
  try{
    const order_id = req.params.order_id;
    const order = await orderService.getOrder(order_id);
  
    
    for(var i=0; i<order.Order_Products.length; i++){
      
      order.Order_Products[i].dataValues.p_name = order.Order_Products[i].Product.p_name;
      order.Order_Products[i].dataValues.p_price = order.Order_Products[i].Product.p_price;
      var photo = order.Order_Products[i].Product.Photos.filter(p=>p.dataValues.photo_role==="main")
      order.Order_Products[i].dataValues.photo_oname= photo[0].photo_oname;
      order.Order_Products[i].dataValues.photo_sname= photo[0].photo_sname;
      order.Order_Products[i].dataValues.photo_type= photo[0].photo_type;
    }
    res.json({order,orderProduct:order.Order_Products });
}catch(error){
  console.log(error);
  next(error);
}
});
router.put("",async(req,res,next)=>{
  try{
    
  const order = req.body;
  const updateOrder = await orderService.update(order);
  res.json(updateOrder);
}catch(error){
  console.log(error);
  next(error);
}
});
module.exports = router;