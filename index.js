// src/index.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { Console } = require('console');
// helpers = require('./Helpers');

const getNextURL = responseData => {
  let ret = "javascript:void(0)";
  if(typeof responseData.next_cursor != "undefined"){
    ret = `${RECHARGE_API}/customers?limit=250&page_info=${responseData.next_cursor}`;
  }
};

const PORT = process.env.PORT || 5000;

const { RECHARGE_API_TOKEN,
        RECHARGE_API,
        HOST,
        RECHARGE_TEST_WEBHOOK_URL,
        RECHARGE_WEBHOOK_SUBSCRIPTION_CREATED_ID,
        OMETRIA_API,
        OMETRIA_API_KEY
      } = process.env;


// the rest of the example code goes here

express()
.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(cors())
  .use(express.urlencoded({extended: true}))
  .use(express.json())
  
  /** Loads the paginated list of all customers on Recharge  **/
  .get("/", async (req, res) => {
    let errors = null, dt2 = null, nc = null, pc = null, 
       vv = "javascript:void(0)", prevURL = vv, nextURL = vv,
    customersURL = `${RECHARGE_API}/customers?limit=250`;

    try{
      let dt = await axios({
        method: "get",
        url: customersURL,
        headers: {
          'X-Recharge-Access-Token': RECHARGE_API_TOKEN,
          'X-Recharge-Version': '2021-11'
        }
      });
      if(dt.status == "200"){
        dt2 = dt.data;
        //Cursors
        pc = dt2.previous_cursor, nc = dt2.next_cursor;
        console.log("[pc,nc]",[pc,nc]);
        prevURL = pc ? `${customersURL}&cursor=${pc}` : vv;
       nextURL = nc ? `${customersURL}&cursor=${nc}` : vv;
        //console.log("Customers: ",dt);
      }
      else{
        console.log("error response from Recharge API: ",dt);
        errors = "An error occured, please check the application logs";
      }
    }
    catch(e){
      console.log("An error occured: ",e); 
      errors = "An error occured, please check the application logs";
    }
  

  res.render('index',{dt2,errors,prevURL,nextURL});  
})
/** Updates custom fields about a customer (from Recharge) on Ometria  **/
.get("/manual-updates", async (req, res) => {
  let errors = null, dt2 = null;
  res.render('manual-updates');
})
/** Updates custom fields about a customer (from Recharge) on Ometria  **/
.post("/update-ometria", async (req, res) => {
  let q = null, ret = {status: "error", message: "nothing happened"};

  if(typeof req.body != "undefined"){
    q = req.body;
  }
 
  let payload = [{
    "@type": "contact",
    "@merge": true,
    id: q.customer_id,
    email: q.customer_email,
    properties: q.fields
  }];
  try{

    let dt = await axios({
      method: "post",
      url: `${OMETRIA_API}/push`,
      headers: {'X-Ometria-Auth': OMETRIA_API_KEY},
      data: payload
    });
    if(dt.status == "200" || dt.status == "202"){
      dt2 = dt.data;
      console.log("response from Ometria API: ",dt2);
      ret = {status: "ok", message: "Contact updated"}
    }
    else{
      console.log("error response from Ometria API: ",dt);
      errors = "An error occured, please check the application logs";
      ret.status = errors;
    }
  }
  catch(e){
    let bigError = `An error occured: ${e})`;
    console.log(bigError); 
    res.status = bigError;
  }
  finally
  {
    res.send(ret);
  }
 

})
/** Gets all customer data from Recharge API **/
.get("/all-customers", async (req, res) => {
  let errors = null, dt2 = null, nc = null, pc = null, customers = [],
  vv = "javascript:void(0)", isRemaining = true;
  customersURL = `${RECHARGE_API}/customers?limit=250`;

  while(isRemaining){
  try{
    let dt = await axios({
      method: "get",
      url: customersURL,
      headers: {
        'X-Recharge-Access-Token': RECHARGE_API_TOKEN,
        'X-Recharge-Version': '2021-11'
      }
    });
    
    if(dt.status == "200"){
      dt2 = dt.data;
      let tc = dt2.customers;
      for(let c of tc){
        customers.push(c);
      }
      
      //Reiterate using the cursor to get all data
      pc = dt2.previous_cursor, nc = dt2.next_cursor;
      console.log("nc: ",nc);

      if(!nc){
        //All records retrieved, break out of the loop
        isRemaining = false;
      }
      
    }
    else{
      console.log("error response from Recharge API: ",dt);
      errors = "An error occured, please check the application logs";
      isRemaining = false;
    }
  }
  catch(e){
    console.log("An error occured: ",e); 
    errors = "An error occured, please check the application logs";
    isRemaining = false;
  }
 }
 console.log("customers.length: ",customers.length);
res.sendStatus(200);
})
/** Creates a webhook on Recharge  **/
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
  else res.sendStatus(200);
})
/** Updates callback URL for a webhook on Recharge  **/
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
/** Tests a webhook on Recharge  **/
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
      console.log("response from testing webhook: ",dt);
      
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
/** Copycat html forms  **/
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
  res.sendStatus(200);
})
.listen(PORT, () => {
  console.log(`your app is now listening on port ${PORT}`);
});