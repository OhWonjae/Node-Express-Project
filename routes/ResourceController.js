const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const paging = require("../utils/paging");
//라우터 객체 생성
const router = express.Router();


router.get("/GetPhoto/:photo_role/:photo_sname/:photo_type",async(req,res,next)=>{
  try{
      
  const photo_role = req.params.photo_role;
  const photo_sname = req.params.photo_sname;
  const photo_type = req.params.photo_type;
  let savePath="";
switch(photo_role){
    case "Main": 
    savePath = "C:/Photos/ProductPhotos/Main/" + photo_sname;
    break;
  case "Sub": 
  savePath = "C:/Photos/ProductPhotos/Sub/" + photo_sname;
    break;
  case "Detail": 
  savePath = "C:/Photos/ProductPhotos/Detail/" + photo_sname;
    break;
   
}
  res.download(savePath);
}catch(error){
  console.log(error);
  next(error);
}
});

module.exports = router;