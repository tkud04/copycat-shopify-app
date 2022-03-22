// src/index.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { Console } = require('console');

/** 
const {ShopifyAPI,Shopify } = require('@shopify/shopify-api');
const { ApiVersion, AuthQuery } = ShopifyAPI;
// helpers = require('./Helpers');

const getNextURL = responseData => {
  let ret = "javascript:void(0)";
  if(typeof responseData.next_cursor != "undefined"){
    ret = `${RECHARGE_API}/customers?limit=250&page_info=${responseData.next_cursor}`;
  }
};

*/
const PORT = process.env.PORT || 5000;

const { SHOPIFY_API,
        SHOPIFY_API_KEY,
        RECHARGE_API_TOKEN,
        RECHARGE_API,
        HOST,
        RECHARGE_TEST_WEBHOOK_URL,
        RECHARGE_WEBHOOK_SUBSCRIPTION_CREATED_ID,
        OMETRIA_API,
        OMETRIA_API_KEY
      } = process.env;

      /*
      let initObject = {
        API_KEY,
        API_SECRET_KEY,
        SCOPES: [SCOPES],
        HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
        IS_EMBEDDED_APP: false,
        API_VERSION: ApiVersion.January22 // all supported versions are available, as well as "unstable" and "unversioned"
      };
      //Shopify.Context.initialize(initObject);
      */
     
      // Storing the currently active shops in memory will force them to re-login when your server restarts. You should
      // persist this object in your app.
      const ACTIVE_SHOPIFY_SHOPS = {};

// the rest of the example code goes here

express()
.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(cors())
  .use(express.urlencoded({extended: true}))
  .use(express.json())
  
  /**Shopify login routes */
  //Authentication routes
.get('/shopify-login', async (req, res) => {
  let authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    SHOP,
    '/auth/callback',
    false,
  );
  return res.redirect(authRoute);
})
.get('/auth/callback', async (req, res) => {
  try {
    const session = await Shopify.Auth.validateAuthCallback(
      req,
      res,
      req.query,
    ); // req.query must be cast to unkown and then AuthQuery in order to be accepted
    ACTIVE_SHOPIFY_SHOPS[SHOP] = session.scope;
  } catch (error) {
    console.error(error); // in practice these should be handled more gracefully
  }
  return res.sendStatus(200); // wherever you want your user to end up after OAuth completes
})

  /** Loads the paginated list of all customers on Recharge  **/
  .get("custom-fields", async (req, res) => {
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
/** Get errors from Ometria Push */
.get("/update-ometria-errors", async (req, res) => {
  let ret = {status: "error", message: "nothing happened"};
  try{
    let dt = await axios({
      method: "get",
      url: `${OMETRIA_API}/push/_errors`,
      headers: {
        'X-Ometria-Auth': OMETRIA_API_KEY,
        'accept': "application/json"
      }
    });
    if(dt.status == "200" || dt.status == "202"){
      dt2 = dt.data;
      console.log("response from Ometria API errors: ",dt2);
     
      ret = {status: "ok", data: dt2};
    }
    else{
      console.log("error response from calling Ometria API errors: ",dt);
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
    console.log("payload: ",payload);
    let dt = await axios({
      method: "post",
      url: `${OMETRIA_API}/push`,
      headers: {
        'X-Ometria-Auth': OMETRIA_API_KEY,
        'accept': "application/json",
        'Content-Type': "application/json"
      },
      data: payload
    });
    if(dt.status == "200" || dt.status == "202"){
      dt2 = dt.data;
      console.log("response from Ometria API: ",dt2);
      if(dt2?.rejected_items){
        for(let x in dt2?.rejected_items)  console.log("errors from Ometria API: ",dt2);
      }
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
.get("/updater", async (req, res) => {
  let errors = null, dt2 = null;
  res.render('update-ometria');
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
        break;
      }
      
      setTimeout( () => {
        console.log("waiting..");
      },100);
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
.get("/shopify-variant-id", async (req, res) => {
  // This shop hasn't been seen yet, go through OAuth to create a session
 if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
    // not logged in, redirect to login
   res.redirect(`/shopify-login`);
   //res.send("Not logged in");
 } else {
   const session = await Shopify.Utils.loadCurrentSession(req, res);
   const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
   // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
   const customers = await client.get({
     path: 'customers',
   });
   console.log("Customers: ",customers);
   // Load your app skeleton page with App Bridge, and do something amazing!
   res.render('customers',{customers: customers});  
 }
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
 .get("/", (req, res) => {
   let v = "copycat";
   if(typeof req.query !== "undefined"){
      let q = req.query;
      if(q.type == "original") v = "copycat5";
      else if(q.type == "sms") v = "copycat4";
      else if(q.type == "birthday") v = "copycat3";
   }
  res.render(v);  

})
/** Get order data from ometria */
.get('/ometria-orders', async (req,res) => {
  let errors = null, dt = null, ret = {status: "error",message: "Unknown error"},
      q = req.query, offset = q.offset || 0, orders = [];

  try{
    console.log("start call");
    let dt = await axios({
      method: "get",
      url: `${OMETRIA_API}/orders?limit=250&offset=${offset}`,
      headers: {
        'X-Ometria-Auth': OMETRIA_API_KEY,
        Accept: 'application/json'
      }
    });
    if(dt.status == "200" || dt.status == "202"){
      dt2 = dt.data;
      //console.log("response from Ometria API: ",dt2[0].lineitems);
      for(let i = 0; i < dt2.length; i++){
        let ll = {
          email: dt2[i].customer.email,
          items: dt2[i].lineitems
      };
      console.log("ll: ",ll);
        orders.push(ll);
    }
  }
    else{
      console.log("error response from Ometria API: ",dt);
      errors = "An error occured, please check the application logs";
      ret.status = errors;
    }
  }
  catch(e){
    errors = JSON.stringify(e);
    console.log("errors: ",e);
  }
  //console.log("orders: ",orders);
  //res.sendStatus(200);
  res.render('orders',{orders, errors, offset});
})

/** Get order data from ometria */
.get('/orders2', async (req,res) => {
  
  res.render('orders2');
})

/** Get order data from ometria */
.get('/ometria-get-customer', async (req,res) => {
  let errors = null, dt = null, ret = {status: "error",message: "Unknown error"},
      q = req.query;

  try{
   // console.log("start call");
    //console.log("email: ",q.email);
    let dt = await axios({
      method: "get",
      url: `${OMETRIA_API}/profiles?email=${encodeURIComponent(q.email)}`,
      headers: {
        'X-Ometria-Auth': OMETRIA_API_KEY,
        Accept: 'application/json'
      }
    });
    if(dt.status == "200" || dt.status == "202"){
      dt2 = dt.data;
      //console.log("response from Ometria API: ",dt2);
      ret = {
        status: "ok",
        data: {
          email: dt2[0].email,
          id: dt2[0].customer_id,
          properties: dt2[0].properties
        }
      };
  }
    else{
      console.log("error response from Ometria API: ",dt);
      errors = "An error occured, please check the application logs";
      ret.message = errors;
    }
  }
  catch(e){
    errors = JSON.stringify(e);
    console.log("errors: ",e);
    ret.message = e;
  }
  //console.log("orders: ",orders);
  res.send(ret);
  //res.render('orders',{orders, errors, offset});
})

/** Get order data from ometria */
.get('/ometria-update-customer', async (req,res) => {
  let errors = null, dt = null, ret = {status: "error",message: "Unknown error"},
      q = req.query;
 
  
 customers.forEach(v => {
  try{
    setTimeout(async () => {
      let dt = await axios({
        method: "get",
        url: `ometria-get-customer?email=${v.email}`,
      });
      if(dt.status == "200" || dt.status == "202"){
        dt2 = dt.data;
        console.log("response from Ometria API: ",dt2);
        
    }
      else{
        console.log("error response from Ometria API: ",dt);
        errors = "An error occured, please check the application logs";
        ret.status = errors;
      }
    },1000);
  }
  catch(e){
    console.log("err: ",e);
  }
});
  
  res.sendStatus(200);
})
/** Get product variant data from shopify */
.get('/shopify-product-variants', async (req,res) => {
  let errors = null, dt = null, ret = {status: "error",message: "Unknown error"},
      q = req.query, pvArray = q.pv.split("_");
 
  /*
https://{shop}.myshopify.com/admin/api/2022-01/products.json \
-H 'Content-Type: application/json' \
-H 'X-Shopify-Access-Token: {access_token}'
 */

  try{
    console.log("start call");
    let dt = await axios({
      method: "get",
      url: `${SHOPIFY_API}/products/${pvArray[0]}/variants.json`,
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    if(dt.status == "200" || dt.status == "202"){
      dt2 = dt.data;
      //console.log("response from Shopify API: ",dt2);

      //Extract the variants title from response
      let variants = [];
      dt2.variants.forEach(element => {
        let {id, title} = element;
        variants.push({id,title});
      });
      console.log("Variants: ",variants);
      ret = {
        status: "ok",
        data: variants
      };
    }
    else{
      console.log("error response from Ometria API: ",dt);
      ret.message = dt;
    }
  }
  catch(e){
    console.log("error response from catch: ",e);
    ret.message = dt;
  }
  
  res.send(ret);
  //res.render('ometria-orders',{orders});

})

/******** WEBHOOKS CALLBACK ********/
.post("/webhook", async (req,res) => {
  console.log("Webhook headers:",req.headers);
  res.sendStatus(200);
})
.listen(PORT, () => {
  console.log(`your app is now listening on port ${PORT}`);
});
