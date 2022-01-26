// src/index.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const PORT = process.env.PORT || 5000;

const { RECHARGE_API_TOKEN, RECHARGE_API, HOST } = process.env;

// the rest of the example code goes here

express()
.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(cors({
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
  .get("/", async (req, res) => {
   
    try{
      let dt = await axios({
        method: "get",
        url: `${RECHARGE_API}/customers`,
        headers: {'X-Recharge-Access-Token': RECHARGE_API_TOKEN}
      });
      let dt2 = dt.data;
        console.log("response from Recharge API: ",dt2);
    }
    catch(e){
      console.log("An error occured: ",e); 
    }
  

  res.render('index');  
})
 .get("/copycat", (req, res) => {
   let v = "copycat";

   if(typeof req.query !== "undefined"){
      let q = req.query;
      if(q.type == "subscribe") v = "copycat2";
      else if(q.type == "sms") v = "copycat4";
      else if(q.type == "birthday") v = "copycat3";
   }
  res.render(v);  

})
.listen(PORT, () => {
  console.log(`your app is now listening on port ${PORT}`);
});