const multer = require("multer");

const multipartFormData = multer({ //multer라는 함수를 통해서 구성 (파일 하나 당 한 번 적용)
  storage: multer.diskStorage({ //어디에 저장? 하드디스크에 저장하고 싶으면 이렇게 지정
    destination: function(req, file, done) { //디스크 위치(경로 지정)

      if(file.fieldname==="p_mainphoto"){
        done(null, "C:/Photos/ProductPhotos/Main/"); //파일 여기에 저장
      }else if(file.fieldname==="p_subphotos"){
        done(null, "C:/Photos/ProductPhotos/Sub/"); //파일 여기에 저장
      }else if(file.fieldname==="p_detailphoto"){
        done(null, "C:/Photos/ProductPhotos/Detail/"); //파일 여기에 저장
      }

     
    },
    filename: function(req, file, done) { //저장할 때 파일 이름 어떻게?
      done(null, Date.now() + "-" + file.originalname); 
    }
  }),
  limits: {fileSize: 10*1024*1024}
});

module.exports = multipartFormData;