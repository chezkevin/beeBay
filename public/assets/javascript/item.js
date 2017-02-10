$(document).ready(function(){

  $.get("/api/items/" + itemId, function(data) {
    item = data;
    populateFields(item);
  })

  function populateFields(item){

    $("#itemImage").append("<img src=" + item.image_url + " alt=" + item.item_name + ">");

    $("#itemName").append("<h1>" + item.item_name + "</h1>");

    $("#currentPrice").append("<h2>" + item.current_price + "</h2>");

    $("#timeLeft").append("<h3>" + item.end_time + "</h2>");
}

  $.get("https://api.ebay.com/buy/browse/v1/item/v1" + item.item_id, function(data){

    $("#description").append("<p>" + data.shortDescription + "</p>")
  })
