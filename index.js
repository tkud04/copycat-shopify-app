// src/index.ts
const express = require('express');
const ShopifyAPI = require('@shopify/shopify-api');
const Shopify = ShopifyAPI.Shopify, { ApiVersion, AuthQuery } = ShopifyAPI;
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

let initObject = {
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.October21 // all supported versions are available, as well as "unstable" and "unversioned"
};
Shopify.Context.initialize(initObject);

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

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
   // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
     // not logged in, redirect to login
    res.redirect(`/login`);
    //res.send("Not logged in");
  } else {
   const session = await Shopify.Utils.loadCurrentSession(req, res);
    current_access_token = session.accessToken;
    // Load your app skeleton page with App Bridge, and do something amazing!
    res.render('index');  
  }
})
.get("/customers", async (req, res) => {
    // This shop hasn't been seen yet, go through OAuth to create a session
   if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
      // not logged in, redirect to login
     res.redirect(`/login`);
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
 .get("/copycat", (req, res) => {
  res.render('copycat');  
})

//Authentication routes
.get('/login', async (req, res) => {
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
    return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`); // wherever you want your user to end up after OAuth completes
  })
.listen(PORT, () => {
  console.log(`your app is now listening on port ${PORT}`);
});