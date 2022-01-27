// src/index.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { Console } = require('console');
// helpers = require('./Helpers');

const PORT = process.env.PORT || 5000;

const { RECHARGE_API_TOKEN,
        RECHARGE_API,
        HOST,
        RECHARGE_TEST_WEBHOOK_URL,
        RECHARGE_WEBHOOK_SUBSCRIPTION_CREATED_ID
      } = process.env;

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
    let errors = null, dt2 = null;
    try{
      let dt = await axios({
        method: "get",
        url: `${RECHARGE_API}/customers`,
        headers: {'X-Recharge-Access-Token': RECHARGE_API_TOKEN}
      });
      if(dt.status == "200"){
        dt2 = dt.data;
        //console.log("response from Recharge API: ",dt2);
      }
      else{
        console.log("error response from Recharge API: ",dt2);
        errors = "An error occures, please check the application logs";
      }
    }
    catch(e){
      console.log("An error occured: ",e); 
      errors = "An error occures, please check the application logs";
    }
  

  res.render('index',{dt2,errors});  
})
.get('/create-webhook', async (req,res) => {
  let errors = null, dt = null;
  try{
     
     dt = await axios({
      method: "post",
      url: `${RECHARGE_API}/webhooks`,
      headers: {
        'X-Recharge-Access-Token': RECHARGE_API_TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: {
        address: RECHARGE_TEST_WEBHOOK_URL,
        topic: "subscription/created"
      }
    });
    if(dt.status == "200"){
      //dt2 = dt.data;
     // console.log("response from Creating webhook: ",dt);
    }
    else{
      console.log("error response from Creating webhook: ",dt);
      errors = "An error occured, please check the application logs";
    }
  }
  catch(e){
    console.log("An error occured: ",e); 
    errors = "An error occured, please check the application logs";
  }

  if(errors) res.send(errors);
  else res.send(`{"status":"ok"}`);
})
.get('/update-webhook', async (req,res) => {
  let errors = null, dt = null;
  try{
     
     dt = await axios({
      method: "put",
      url: `${RECHARGE_API}/webhooks/${RECHARGE_WEBHOOK_SUBSCRIPTION_CREATED_ID}`,
      headers: {
        'X-Recharge-Access-Token': RECHARGE_API_TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: {
        address: "https://calm-island-24035.herokuapp.com/webhook"
      }
    });
    if(dt.status == "200"){
      //dt2 = dt.data;
      //console.log("response from testing webhook: ",dt);
      
    }
    else{
      console.log("error response from testing webhook: ",dt);
      errors = "An error occured, please check the application logs";
    }
  }
  catch(e){
    console.log("An error occured: ",e); 
    errors = "An error occured, please check the application logs";
  }

  if(errors) res.send(errors);
  else res.sendStatus(200);
})
.get('/test-webhook', async (req,res) => {
  let errors = null, dt = null;
  try{
     
     dt = await axios({
      method: "post",
      url: `${RECHARGE_API}/webhooks/${RECHARGE_WEBHOOK_SUBSCRIPTION_CREATED_ID}/test`,
      headers: {
        'X-Recharge-Access-Token': RECHARGE_API_TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: {}
    });
    if(dt.status == "200"){
      //dt2 = dt.data;
      console.log("response from testing webhook: ",dt).data;
      
    }
    else{
      console.log("error response from testing webhook: ",dt);
      errors = "An error occured, please check the application logs";
    }
  }
  catch(e){
    console.log("An error occured: ",e); 
    errors = "An error occured, please check the application logs";
  }

  if(errors) res.send(errors);
  else res.sendStatus(200);
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
/******** WEBHOOKS CALLBACK ********/
.post("/webhook", async (req,res) => {
  console.log("Webhook headers:",req.headers);
})
.listen(PORT, () => {
  console.log(`your app is now listening on port ${PORT}`);
});