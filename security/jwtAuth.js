const jwt = require("jsonwebtoken");

const jwtAuth = {
    createJwt: function(user_id){
        const authToken = jwt.sign({user_id},process.env.JWT_SECRET,{expiresIn:"12h"});
        return authToken;
    },
    //받은 jwt를 검사해서 거기서 userid 얻어내서 해당 정보 저장
    setAuth: function(req,res){
        //JWT 얻기------------------------------------------------
        let authToken = null;
        if(req.signedCookies.authToken){
            //JWT가 쿠키로 넘어왔을때
            authToken = req.signedCookies.authToken;
        }else if(req.headers.authtoken){
            //JWT가 다른 헤더명으로 넘어왔을때
            authToken = req.headers.authtoken;
        }else if(req.query.authtoken){
            //JWT가 쿼리스트링으로 넘어왔을때
            authToken = req.query.authtoken;
        }
        //JWT 유효성 검사----------------------------------------------
        if(authToken){
            //JWT 파싱
            const decoded = jwt.verify(authToken,process.env.JWT_SECRET);
            //JWT 만료시간 얻기
            const expires = decoded.exp;
            // 현재시간(초) 얻기
            const now  = Math.floor(new Date().getTime()/1000);
            //현재 시간(초)와 비교
            if((expires-now)>0){
                //jwt에 userid가 포함되어 있을 경우
                if(decoded.user_id){
                    //req에 userid를 저장
                    req.user_id = decoded.user_id;
                    //모든 nunjucks 템플릿에서 userid를 바인딩 할 수 있도록 설정
                    res.locals.user_id = decoded.user_id;
                }
            }
        }
    },
    checkAuth: function(req,res,next){
        if(req.user_id){
            next();
        }else{
            //mpa 일경우
           // res.redirect("/exam12/loginForm");
            //restapi 일경우
            const error=  new Error("인증필요");
            error.status = 403;
            next(error);
        }
    }
    
};

module.exports = jwtAuth;