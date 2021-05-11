const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const orderService = require("../services/order-service");
const paging = require("../utils/paging");
//라우터 객체 생성
const router = express.Router();


router.get("",async(req,res,next)=>{
  try{
  const review_score = req.query.review_score?parseInt(req.query.review_score):0;
  const searchType = req.query.searchType;
  const searchContent = req.query.searchContent;
  const pageNo = req.query.pageNo?parseInt(req.query.pageNo):1;
  const totalRows =await reviewService.getCount(review_score,searchType,searchContent);

  const pager = paging.init(5,5, pageNo,totalRows);
  const reviews = await reviewService.list(pager, review_score,searchType,searchContent);
  res.json({reviews,pager});
}catch(error){
  console.log(error);
  next(error);
}
});

router.get("/:review_id",async(req,res,next)=>{
  try{
    
  const review_id = req.params.review_id;
  const review = await reviewService.getReview(review_id);
  res.json(review);
}catch(error){
  console.log(error);
  next(error);
}
});
router.put("",async(req,res,next)=>{
  try{
    
  const review = req.body;
  const updateReview = await reviewService.update(review);
  res.json(updateReview);
}catch(error){
  console.log(error);
  next(error);
}
});
module.exports = router;