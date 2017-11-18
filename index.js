#!/usr/bin/env node

// When I save a URL to Instapaper,
//  - IFTTT “Instapaper” condition is triggered, so “Maker” event is triggered
//  - Alexandria extracts a “domain” from a “url” in IFTTT’s request body
//  - Alexandria calls the Pocket “get” API endpoint providing “domain”
//  - Pocket responds with a list of items — each includes a “given_url” and “resovled_url” parameter
//  - Alexandria extracts a list of “given_url” and “resolved_url”
//  - Alexandria stops processing if the “url” is listed — this signifies an already-queued item
//  - Alexandria calls the Pocket “add” API endpoint providing “url”
//  - Pocket responds by queueing the item at the URL

require = require("@std/esm")(module);
require("./index.mjs");
