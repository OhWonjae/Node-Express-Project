const sessionAuth = {
    setAuth: function(req, res, userid) {
        //userid가 있다면
        if(userid){
            //세션에 userid를 저장
            req.session.userid = userid;
        }
        //req에 추가적으로 userid를 저장(편리성, JWT 인증와 통일화)
        req.userid = req.session.userid;
        console.log("session : "+req.session.userid);
        //nunjucks의 모든 view에서 userid를 가져올수있음
        res.locals.userid = req.session.userid;
    },
    checkAuth: function(req,res,next) {
        if(req.user_id){
            next();
        }else{
            //mpa 일경우
            res.redirect("/exam12/loginForm");
            //restapi 일경우
            //const error=  new Error("인증필요");
            //error.status = 403;
            //next(error);
        }
    },
    removeAuth: function(req) {
        delete req.session.user_id;
    }
};



module.exports = sessionAuth;