var inquirer = require("inquirer");
var request = require('request');
var open = require("open");
var db = require("./models");

var url = "http://svcs.ebay.com/services/search/FindingService/v1"
url += "?OPERATION-NAME=findItemsByKeywords";
url += "&SERVICE-VERSION=1.0.0";
url += "&SECURITY-APPNAME=AlanMarc-BeeBay-PRD-0cd44e4f7-0597c5a8";
url += "&GLOBAL-ID=EBAY-US";
url += "&RESPONSE-DATA-FORMAT=JSON";
// url += "&callback=callback";
url += "&REST-PAYLOAD";
url += "&keywords=bee%20products";
url += "&paginationInput.entriesPerPage=5";

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    ebayJSON = JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0];
    for (var i = 0; i < 5; i++) {
      // console.log(ebayJSON.item[i].title);
      db.Item.create({
        item_name: ebayJSON.item[i].title[0],
        image_url: ebayJSON.item[i].galleryURL[0]
      }).then(function(data){
      })

    }

     }
  else{console.log(error)}
});

//
// function callback(root) {
//    console.log(root);
// }
