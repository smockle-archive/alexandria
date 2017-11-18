#!/usr/bin/env node
//@ts-check

// When I save a URL to Instapaper,
//  - IFTTT “Instapaper” condition is triggered, so “Maker” event is triggered
//  - Alexandria extracts a “domain” from a “url” in IFTTT’s request body
//  - Alexandria calls the Pocket “get” API endpoint providing “domain”
//  - Pocket responds with a list of items — each includes a “given_url” and “resovled_url” parameter
//  - Alexandria extracts a list of “given_url” and “resolved_url”
//  - Alexandria stops processing if the “url” is listed — this signifies an already-queued item
//  - Alexandria calls the Pocket “add” API endpoint providing “url”
//  - Pocket responds by queueing the item at the URL

import dotenv from "dotenv";
dotenv.config();

import https from "https";
import express from "express";

const app = express();
const port = 3000;

function getRequestToken(consumerKey, redirectURI) {
  const postData = JSON.stringify({
    consumer_key: consumerKey,
    redirect_uri: redirectURI
  });
  const options = {
    hostname: "api.getpocket.com",
    port: "443",
    path: "/v3/oauth/request",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF8",
      "Content-Length": postData.length,
      "X-Accept": "application/json"
    }
  };
  var request = https.request(options, response => {
    console.log("statusCode:", response.statusCode);
    console.log("headers:", response.headers);

    response.on("data", data => {
      process.stdout.write(data);
    });
  });
  request.on("error", error => {
    console.error(error);
  });
  request.write(postData);
  request.end();
}

app.get("/", (request, response) => {
  setTimeout(
    () =>
      getRequestToken(
        process.env.POCKET_CONSUMER_KEY,
        `http://localhost:${port}/authorization-finished`
      ),
    0
  );
  response.send("Hello World!");
});

app.get("/authorization-finished", (request, response) =>
  response.send(request.body.code)
);

app.listen(port, () => console.log("Listening on port 3000"));
