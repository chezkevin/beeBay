var request = require('request');
var db = require("../models");
//var moment = require("moment");

// console.log(moment().format());

//Constructing eBay API call
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
url += "?OPERATION-NAME=findItemsByKeywords";
url += "&SERVICE-VERSION=1.0.0";
url += "&SECURITY-APPNAME=AlanMarc-BeeBay-PRD-0cd44e4f7-0597c5a8"; //AppID key
url += "&GLOBAL-ID=EBAY-US";
url += "&RESPONSE-DATA-FORMAT=JSON";
url += "&REST-PAYLOAD";
url += "&keywords=bee%20products"; //Keyword search
url += "&paginationInput.entriesPerPage=15"; //number of products returned

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    ebayJSON = JSON.parse(body).findItemsByKeywordsResponse[0].searchResult[0];

    // var timeArr = ebayJSON.item[0].listingInfo[0].endTime[0].split("T");

    // var time = moment(timeArr[1]).local();
    // console.log(moment(ebayJSON.item[0].listingInfo[0].endTime[0]).format("DD-MM-YYY h:mm:ss a"));
    // console.log(time);

    for (var i = 0; i < ebayJSON.item.length; i++) {
      db.Item.create({
        item_id: ebayJSON.item[i].itemId[0],
        item_name: ebayJSON.item[i].title[0],
        image_url: ebayJSON.item[i].viewItemURL[0],
        image_url_thumbnail: ebayJSON.item[i].galleryURL[0],
        end_time: ebayJSON.item[0].listingInfo[0].endTime[0],
        category: ebayJSON.item[i].primaryCategory[0].categoryName[0],
        current_price: ebayJSON.item[i].sellingStatus[0].currentPrice[0].__value__,
        condition: ebayJSON.item[i].condition[0].conditionDisplayName[0] || null

      });
    }
}
  else{console.log(error);}

});
