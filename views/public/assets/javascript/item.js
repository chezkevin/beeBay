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
    // overall div for image panel and info panel
    var imgPanel = $("<div>");
    imgPanel.addClass("panel panel-default");
    var imgPanelBody = $("<div>");
    imgPanelBody.addClass("panel-body");

    var infoPanel = $("<div>");
    infoPanel.addClass("panel panel-default");
    var infoPanelBody = $("<div>");
    infoPanelBody.addClass("panel-body");

    var image = $("#itemImage");
    var itemInfo = $("#itemInfo");
    var itemName = $("#itemName");
    var itemPrice = $("#currentPrice");
    var itemTimeLeft = $("#timeLeft");

    var bidContainer = $("<div>");
    var bidInput = $("<input>");
    var bidBtn = $("<button>");

    itemName.html("<h2>" + item.item_name + "</h2>");
    itemPrice.html("<h3>" + item.current_price + "</h3>");
    itemTimeLeft.html("<h4>" + item.end_time + "</h4>");

    bidBtn.addClass("bid-btn");
    bidBtn.addClass("btn btn-success");
    bidBtn.attr('type', 'submit');
    bidBtn.attr('href', '/api/items/bid/' + item.id);
    bidBtn.attr('id', item.id);
    bidBtn.text("Bid now");

    // populate image panel
    imgPanelBody.append("<img src=" + item.image_url_thumbnail + " alt=" + item.item_name + ">");
    imgPanel.append(imgPanelBody);
    image.append(imgPanel);

    bidContainer.append(bidInput)
        .append(bidBtn);

    infoPanelBody.append(itemName)
                 .append(itemPrice)
                 .append(itemTimeLeft)
                 .append(bidBtn);
    infoPanel.append(infoPanelBody);
    itemInfo.append(infoPanel);
  }

  // $.get("https://api.ebay.com/buy/browse/v1/item/v1" + item.item_id, function(data){
  //
  //   $("#description").append("<p>" + data.shortDescription + "</p>")
  // })
});
