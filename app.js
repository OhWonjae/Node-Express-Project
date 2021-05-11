//모듈 가져오기
const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {sequelize} = require("./sequelize/models/index");
const sessionAuth = require("./security/sessionAuth");
const jwtAuth = require("./security/jwtAuth");
const cors = require("cors");
//라우터 가져오기
console.log("----------");
console.log(0/5);

const authController = require("./routes/AuthController");
const reviewController = require("./routes/ReviewController");
const qnaController = require("./routes/QnaController");
//.env 파일을 읽어서 process.env에 추가
dotenv.config();

//애플리케이션 객체 생성
const app = express();
app.set("port", process.env.PORT);

//탬플릿 엔진으로 nunjucks를 설정
//뷰 파일의 확장명을 .hmtl로 한다.
app.set("view engine", "html");
//뷰 파일의 폴더 설정
nunjucks.configure("views", {
  express: app,
  watch: true
});
//sequelize 데이터 연결과 동시에 모델과 테이블을 매칭
sequelize.sync()
  .then(()=>{
    console.log("DB연결성공");
  })
  .catch((err)=>{
    console.log("DB연결실패:" + err.message);
  });

//cors 설정
// app.use((req,res,next)=>{
//   //*의 의미는 어떤 도메인이든 허용해주겠따는 거임
//   res.set("Access-Control-Allow-Origin","*");
//   res.set("Access-Control-Allow-Credentials","false");  //JWT쿠키 인증일 경우
//   res.set("Access-Control-Allow-Headers","*");
//   res.set("Access-Control-Allow-Methods","*");
//   next();
// });

app.use(cors({
  origin:"*",
  allowedHeaders:"*",
  methods:"*",
  credentials:false
}));

//정적 파일들을 제공하는 폴더 지정
app.use(express.static(path.join(__dirname + "/public")));


//모든 요청 경로에 실행되는 미들웨어
// app.use((req, res, next) => {
//   console.log("미들웨어1 전처리");
//   next();
//   console.log("미들웨어1 후처리");
// });

// app.use((req, res, next) => {
//   console.log("미들웨어2 전처리");
//   next();
//   console.log("미들웨어2 후처리");
// }, (req, res, next) => {
//   console.log("미들웨어3 전처리");
//   next();
//   console.log("미들웨어3 후처리");
// }); 

//로그 출력을 위한 미들웨어 적용
// app.use(morgan("dev"));
// app.use(morgan("combined"));
// app.use(morgan(":method :url :status :res[content-length] :remote-addr"));

//브라우저 캐싱 금지 미들웨어 적용
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});



//요청 http 본문에 있는(POST 방식) 데이터를 파싱해서
//req.body 객체로 만드는 미들웨어
//content type을 보고 파싱함
app.use(express.urlencoded({extended:true})); //x-www-form-urlencoded: param1=value1&param2=value2
app.use(express.json()); //raw/json: {"param1":"value1", "param2":"value2"}

//요청 HTTP 헤더에 있는 쿠키를 파싱해서 
//req.cookies or req.signedCookies 객체로 생성하는 미들웨어 적용
app.use(cookieParser(process.env.COOKIE_SECRET));

//세션 설정
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000*60*30
  }
}));

//모든 템플릿(뷰, .html)에서 바인딩할 수 있는 데이터를 설정하는 미들웨어 적용
app.use((req, res, next) => {
  
 // res.locals.uid = req.session.uid || null; // locals: 응답을 만들때만 쓰는
  //세션 인증일 경우
  //sessionAuth.setAuth(req,res); // res.locals.userid = req.session.userid 로 바로 써도됨.
  //jwt 인증일 경우
  jwtAuth.setAuth(req,res);
  
  next(); // next() 붙여줘야 모든 템플릿에서 uid 사용가능.

});




//요청 경로와 라우터 매핑
app.use("/auth", authController);
app.use("/reviews", reviewController);
app.use("/qna", qnaController);

//404처리 미들웨어
//위에 맞는 경로가 없을때
app.use((req, res, next) => {
  const err = new Error("잘못된 요청");
  //err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  const error = (process.env.NODE_ENV !== "production")? err: {};
  //err = (req.app.get("env") !== "production")? err: {};
  err.message = req.method + " " + req.url + ": " + err.message;
  err.status = err.status || 500;
  res.status(err.status);
  res.json({error});
});

//애플리케이션 실행
app.listen(app.get("port"), () => {
  console.log(`Listening to port ${app.get("port")}`);
});