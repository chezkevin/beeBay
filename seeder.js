var inquirer = require("inquirer");
var request = require('request');
var open = require("open");


inquirer.prompt([{
  message: "What kind of items do you want to populate?",
  name: "item"
},
{
  message: "How many of this item do you want?",
  name: "quantity"
}
]).then(function(answers){

  var search = answers.item.trim().replace(" ","%20");

  var url = "http://svcs.ebay.com/services/search/FindingService/v1"
  url += "?OPERATION-NAME=findItemsByKeywords";
  url += "&SERVICE-VERSION=1.0.0";
  url += "&SECURITY-APPNAME=AlanMarc-BeeBay-PRD-0cd44e4f7-0597c5a8";
  url += "&GLOBAL-ID=EBAY-US";
  url += "&RESPONSE-DATA-FORMAT=JSON";
  // url += "&callback=callback";
  url += "&REST-PAYLOAD";
  url += "&keywords=" + search;
  url += "&paginationInput.entriesPerPage=" + answers.quantity;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      ebayJSON = JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0];
      for (var i = 0; i < answers.quantity; i++) {
        console.log(ebayJSON.item[i].title);
      }
      open(ebayJSON.item[0].galleryURL[0]);
       }
    else{console.log(error)}
  });
});
//
// function callback(root) {
//    console.log(root);
// }
