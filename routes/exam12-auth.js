const express = require("express");
const userService = require("../services/user-service");
const sessionAuth = require("../security/sessionAuth");
const jwtAuth = require("../security/jwtAuth");
const router = express.Router();
router.get("",(req,res,next)=>{
  res.render("exam12_auth/index");
});
router.get("/loginForm",(req,res,next)=>{
  //로그인 실패시 리다이렉트해서 요청된 경우 에러정보 얻기
  let loginError = req.session.loginError;
  //로그인 실패시 저장했던 에러 정보 삭제
  //사용자가 직접 /loginForm을 요청했을때 에러 정보가 나오면 안되기 때문에
  if(loginError){
    delete req.session.loginError;
  }else{
    loginError={};
  }
  res.render("exam12_auth/loginForm",{loginError});
});
router.get("/joinForm",(req,res,next)=>{
  res.render("exam12_auth/joinForm");
});

router.post("/join",async (req,res,next)=>{
  try{
    const user = req.body;
    await userService.create(user);
    res.redirect("/exam12");
  }catch(error){
    next(error);
  }
});

router.post("/login",async(req,res,next)=>{
  try{
    const user = req.body;
    const result = await userService.login(user);
    console.log(result);
    if(result.id!=="success"){
      req.session.loginError = result;
     res.redirect("/exam12/loginForm"); 
    }else{
      //세션 인증일 경우
      sessionAuth.setAuth(req,res,user.userid);
      //jwt 인증일 경우
      const authToken = jwtAuth.createJwt(user.userid);
      res.cookie("authToken",authToken,{
        domain: "localhost", //해당 쿠키가 어떤 서버로 보내져야 하는지
        path: "/",
        expires: new Date(new Date().getTime()+ 1000*60*30),
        signed: true,   // 서버가 서명을 해서 쿠키의 값을 변형하지 못하도록 설정  
        httpOnly: true, // 클라이언트의 JS가 쿠키의 접근하지 못하도록 방지
        secure: false   // http, https 모두 쿠리를 전송할 수 있도록 설정   
      });

      //리다이렉트
      res.redirect("/exam12");      
    }
  }catch(err){
    next(err);
  }
});


router.get("/logout",async(req,res)=>{
  sessionAuth.removeAuth(req);

  //JWT 인증일 경우
  res.clearCookie("authToken");
  res.redirect("/exam12");
});


module.exports = router;