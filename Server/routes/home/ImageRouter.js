const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get('/imageList',function(req,res,next){
    fs.readdir('../public/images/home',function(err,list){

        let selectedMap = new Set();
        let selectedImageList = new Array();

        while(true){
            let number =  (Math.floor(Math.random()*1000))%list.length+1;

            if(selectedMap.size == 3){
                break;
            }
            else if(selectedMap.has(number)){
                
            }
            else{
                selectedMap.add(number);
                selectedImageList.push(list[number-1]);
            }
        }
        return res.status(200).json({list:selectedImageList});
    })
})

router.use('/homeMainImage',function(req,res,next){
    next();
},express.static("../public/images/home"))

module.exports = router;