$(document).ready(function(){
  // find the item id by grabbing URL
  var pathArray = window.location.pathname.split( '/' );
  var newPathname;
  var item;
  var itemId = pathArray[3];

  // event listener for bidding from the item list page
  $(document).on('click', 'button', function(e) {
      var newBid = parseFloat($(this).prev().val());
      var itemId = $(this).attr('id');
      if (isNaN(newBid)) {
          alert("Please enter a number.");
      } else {
          checkBid(itemId, newBid);
      }
  });

  // grab details about the item using api
  $.get("/api/items/" + itemId, function(data) {
    item = data;
    populateFields(item);
  })

  // create html to send to item detail page
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
    bidContainer.addClass("bid-container");
    bidInput.addClass("bidder");
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
                 .append(bidContainer);
    infoPanel.append(infoPanelBody);
    itemInfo.append(infoPanel);
  }

  // $.get("https://api.ebay.com/buy/browse/v1/item/v1" + item.item_id, function(data){
  //
  //   $("#description").append("<p>" + data.shortDescription + "</p>")
  // })

  // checks that the user's bid was high enough to make a bid
  function checkBid(itemId, bid) {
      $.get("/api/items/" + itemId, function(data) {
          var singleItem = data;
          var itemPrice = singleItem.current_price;
          if (bid < itemPrice) {
              alert("Your bid did not go through! Please enter a bid higher than " + itemPrice);
          } else {
              makeBid(itemId, bid);
          }
      });
  }

  // uses a POST request to make the bid
  function makeBid(itemId, bid) {
      var data = {
          bid: bid
      };
      $.ajax({
          url: '/api/items/bid/' + itemId,
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function(result) {
              alert("Congrats! You are the highest bidder.");
              window.location.href = "/main";
          },
          error: function(request, msg, error) {
              // handle failure
              console.log(request);
              console.log(msg);
              console.log(error);
          }
      });
  }
});
