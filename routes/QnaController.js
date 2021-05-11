const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const qnaService = require("../services/qna-service");
const paging = require("../utils/paging");
//라우터 객체 생성
const router = express.Router();


router.get("",async(req,res,next)=>{
  try{
  const qa_category = req.query.qa_category;
  const keyword = req.query.keyword;
  const pageNo = req.query.pageNo?parseInt(req.query.pageNo):1;
  const totalRows =await qnaService.getCount(qa_category,keyword);
  const pager = paging.init(5,5, pageNo,totalRows);
  const qnas = await qnaService.list(pager,qa_category,keyword);
  res.json({qnas,pager});
}catch(error){
  console.log(error);
  next(error);
}
});

router.get("/:qa_id",async(req,res,next)=>{
  try{
  const qa_id = req.params.qa_id;
  const qna = await qnaService.getQna(qa_id);
  res.json(qna);
}catch(error){
  console.log(error);
  next(error);
}
});

router.put("",async(req,res,next)=>{
  try{
    
  const qna = req.body;
  const updateQna = await qnaService.update(qna);
  res.json(updateQna);
}catch(error){
  console.log(error);
  next(error);
}
});

router.delete("/:qa_id",async(req,res,next)=>{
  try{
  const qa_id = req.params.qa_id;
  const deleteQna = await qnaService.delete(qa_id);
  res.json(deleteQna);
}catch(error){
  console.log(error);
  next(error);
}
});
module.exports = router;