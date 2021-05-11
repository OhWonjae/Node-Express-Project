const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const userService = require("../services/user-service");
const paging = require("../utils/paging");
//라우터 객체 생성
const router = express.Router();

//요청 매핑하기
router.post("/login",async(req,res,next)=>{
  try{
    const user = req.body;
    const result = await userService.login(user);
    if(result.id!=="success"){
      req.session.loginError = result;
      res.status(500);
     res.json(new Error());
    }else{
      console.log(user.uid);    
      //jwt 인증일 경우
      const authToken = jwtAuth.createJwt(user);
      // res.cookie("authToken",authToken,{
      //   domain: "localhost", //해당 쿠키가 어떤 서버로 보내져야 하는지
      //   path: "/",
      //   expires: new Date(new Date().getTime()+ 1000*60*30),
      //   signed: true,   // 서버가 서명을 해서 쿠키의 값을 변형하지 못하도록 설정  
      //   httpOnly: true, // 클라이언트의 JS가 쿠키의 접근하지 못하도록 방지
      //   secure: false   // http, https 모두 쿠리를 전송할 수 있도록 설정   
      // });
      //json 결과보냄
      res.json({uid:user.uid, authToken:authToken});      
    }
  }catch(err){
    next(err);
  }});

  router.get("/usercount",async(req,res,next)=>{
    try{
      const count = await userService.getCount();
      res.json(count);
    }catch(err){
      next(err);
    }
  });

  router.get("/keywordlist",async(req,res,next)=>{
    try{
    const keyword = req.query.keyword;
    const pageNo = req.query.pageNo?parseInt(req.query.pageNo):1;

    const totalRows =await userService.getCount(keyword);
    console.log(totalRows);
    const pager = paging.init(5,5, pageNo,totalRows);
    const users = await userService.list(pager, keyword);
    res.json({users,pager});
}catch(error){
    console.log(error);
    next(error);
}
});

router.get("/:user_id",async(req,res,next)=>{
  try{
  console.log("asdf");
  const user_id = req.params.user_id;
  console.log(user_id);
  const user = await userService.getUser(user_id);
  res.json(user);
}catch(error){
  console.log(error);
  next(error);
}
});

router.put("",async(req,res,next)=>{
  try{
  const user = req.body;
  console.log(user);
  const updateUser = await userService.update(user);
  res.json(updateUser);
}catch(error){
  console.log(error);
  next(error);
}
});

module.exports = router; // 라우터 내보내긴


