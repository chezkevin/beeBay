$(document).ready(function(){
  var pathArray = window.location.pathname.split( '/' );
  console.log(pathArray);
  var newPathname;
  var item;
  var itemId = pathArray[3];

  $.get("/api/items/" + itemId, function(data) {
    console.log("itemId: " + itemId);
    console.log("data: " + data);
    item = data;
    populateFields(item);
  })

  function populateFields(item){

    $("#itemImage").append("<img src=" + item.image_url_thumbnail + " alt=" + item.item_name + ">");
    $("#itemName").append("<h2>" + item.item_name + "</h2>");
    $("#currentPrice").append("<h3>" + item.current_price + "</h3>");
    $("#timeLeft").append("<h4>" + item.end_time + "</h4>");
  }

  // $.get("https://api.ebay.com/buy/browse/v1/item/v1" + item.item_id, function(data){
  //
  //   $("#description").append("<p>" + data.shortDescription + "</p>")
  // })
});
