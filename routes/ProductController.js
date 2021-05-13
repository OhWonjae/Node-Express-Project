const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const productService = require("../services/product-service");
const paging = require("../utils/paging");
const multipartFormData = require("../utils/multipart-form-data");
const sizeService = require("../services/size-service");
const photoService = require("../services/photo-service");
//라우터 객체 생성
const router = express.Router();


router.get("",async(req,res,next)=>{
  try{
  const optionVal = req.query.optionVal;
  const pageNo = req.query.pageNo?parseInt(req.query.pageNo):1;
  const totalRows =await productService.getCount();
  const pager = paging.init(5,5, pageNo,totalRows);
  const products = await productService.list(pager,optionVal);
  res.json({products,pager});
}catch(error){
  console.log(error);
  next(error);
}
});

router.get("/:p_id",async(req,res,next)=>{
  try{
  const p_id = req.params.p_id;
  const product = await productService.getProduct(p_id);
  product.dataValues.photolist = product.Photos;
  product.dataValues.sizelist = product.Sizes;

  console.log(product);
  res.json(product);
}catch(error){
  console.log(error);
  next(error);
}
});

router.get("/CountSort/:sort",async(req,res,next)=>{
  try{
  const sort = req.params.sort;
  const count = await productService.getCountSort(sort);
  
  res.json(count);
}catch(error){
  console.log(error);
  next(error);
}
});

router.post("",multipartFormData.fields([{name:"p_mainphoto"}, {name:"p_subphotos"},{name:"p_detailphoto"}]),async(req,res,next)=>{
    try{
    const product = req.body;
    const files = req.files;
    console.log(files);
    product.p_salescount=0;
    product.p_rate=0;
    product.p_upload_date=new Date();
    product.p_enabled = 1;
    const createProduct = await productService.create(product);
    for(var i=0; i< product.p_size.length; i++){
        if(product.p_size[i]!=="false"){
            const size = {p_id:createProduct.p_id, p_size:product.p_size[i]};
            await sizeService.create(size);
        }
    }
  
   if(files.p_mainphoto&&files.p_mainphoto.length>0){
    var type  = files.p_mainphoto[0].mimetype.split("/")[1];
    var photo = {photo_oname:files.p_mainphoto[0].originalname, photo_sname:files.p_mainphoto[0].filename
        , photo_type:type, photo_role:"main", p_id:createProduct.p_id}
        await photoService.create(photo);
   } 
   if(files.p_subphotos&&files.p_subphotos.length>0){
    for(var i=0; i<files.p_subphotos.length; i++){
        var subphoto = files.p_subphotos[i];
        var type  = subphoto.mimetype.split("/")[1];
        var photo = {photo_oname:subphoto.originalname, photo_sname:subphoto.filename
            , photo_type:type, photo_role:"sub", p_id:createProduct.p_id}
            await photoService.create(photo);
    }

   }
   if(files.p_detailphoto&&files.p_detailphoto.length>0){
    var type  = files.p_detailphoto[0].mimetype.split("/")[1];
    var photo = {photo_oname:files.p_detailphoto[0].originalname, photo_sname:files.p_detailphoto[0].filename
        , photo_type:type, photo_role:"detail", p_id:createProduct.p_id}
        await photoService.create(photo);
   }
    
    res.json(createProduct);
  }catch(error){
    console.log(error);
    next(error);
  }
  });



  router.put("",multipartFormData.fields([{name:"p_mainphoto"}, {name:"p_subphotos"},{name:"p_detailphoto"}]),async(req,res,next)=>{
    try{
    const product = req.body;
    const files = req.files;
    console.log("----------------------");
    console.log(product);
    const updateProduct = await productService.update(product);
    await sizeService.delete(product.p_id);
    for(var i=0; i< product.p_size.length; i++){
        if(product.p_size[i]!=="false"){
            const size = {p_id:product.p_id, p_size:product.p_size[i]};
            await sizeService.create(size);
        }
    }
    if(product.photo_ids&&product.photo_ids.length>0){
        for(var i=0; i< product.photo_ids.length; i++){
                await photoService.delete(product.photo_ids[i]); 
        }
    }


   if(files.p_mainphoto&&files.p_mainphoto.length>0){
    var type  = files.p_mainphoto[0].mimetype.split("/")[1];
    var photo = {photo_oname:files.p_mainphoto[0].originalname, photo_sname:files.p_mainphoto[0].filename
        , photo_type:type, photo_role:"main", p_id:product.p_id}
        await photoService.create(photo);
   } 
   if(files.p_subphotos&&files.p_subphotos.length>0){
    for(var i=0; i<files.p_subphotos.length; i++){
        var subphoto = files.p_subphotos[i];
        var type  = subphoto.mimetype.split("/")[1];
        var photo = {photo_oname:subphoto.originalname, photo_sname:subphoto.filename
            , photo_type:type, photo_role:"sub", p_id:product.p_id}
            await photoService.create(photo);
    }

   }
   if(files.p_detailphoto&&files.p_detailphoto.length>0){
    var type  = files.p_detailphoto[0].mimetype.split("/")[1];
    var photo = {photo_oname:files.p_detailphoto[0].originalname, photo_sname:files.p_detailphoto[0].filename
        , photo_type:type, photo_role:"detail", p_id:product.p_id}
        await photoService.create(photo);
   }
    
    res.json(updateProduct);
  }catch(error){
    console.log(error);
    next(error);
  }
  });

router.delete("/:p_id",async(req,res,next)=>{
  try{
  const p_id = req.params.p_id;
  const deleteSize = await sizeService.delete(p_id);
  const deleteProduct = await productService.delete(p_id);
  res.json(deleteProduct);
}catch(error){
  console.log(error);
  next(error);
}
});
module.exports = router;