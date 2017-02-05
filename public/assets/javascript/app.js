$(document).ready(function() {
  // Getting jQuery references to the item div
  //var itemContainer = $(".item-container");
  //var panel = $(".panel.panel-default");
  var panelBody = $(".panel-body");
  var items;

  getItems("");

  // this function makes an api call and stores the data in the items array
  // then, calls initializePanels to display the items
  function getItems(item){
    itemId = item || "";
    if (itemId) {
      itemId = "/?itemId=" + itemId;
    }
    $.get("/api/items" + itemId, function(data) {
      console.log("Items", data);
      items = data;
      if (!items || !items.length) {
        displayEmpty(item);
      }
      else {
        initializePanels();
      }
    });
  };

  // this function initializes the item panels
  // calls a panel function and appends to panel body
  function initializePanels(){
    panelBody.empty();
    var itemsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewPanel(items[i]));
    }
    panelBody.append(itemsToAdd);
  };

  // this function creates the html of an item in a panel
  function createNewPanel(item){
    // overall div for item
    var newPanel = $("<div>");
    newPanel.addClass("panel panel-default");
    var newPanelBody = $("<div>");
    newPanelBody.addClass("panel-body");

    // item content begins here
    var imageThumb = '<img class="item-img-thumb" src ="' + item.image_url_thumbnail + '" />';
    var itemSpan = $("<span>");
    var itemLink = $("<a>");
    var itemH3 = $("<h3>");
    var itemDesc = $("<p>");
    var itemCurrentPrice = $("<p>");
    var itemEndTime = $("<p>");

    // add classes to item span
    itemSpan.addClass("item-details");
    itemH3.addClass("item-header");
    itemDesc.addClass("item-desc");
    itemCurrentPrice.addClass("item-current-price");
    itemEndTime.addClass("item-end-time");

    // populate item content
    itemLink.attr('href', '/item/' + item.id);
    itemH3.text(item.item_name);
    itemDesc.text(item.description);
    itemCurrentPrice.text("Current bid: " + item.current_price);
    itemEndTime.text("End time: " + item.end_time);
    itemLink.append(itemH3);

    itemSpan.append(itemLink)
            .append(itemDesc)
            .append(itemCurrentPrice)
            .append(itemEndTime);

    // add item content to panel
    newPanel.append(imageThumb);
    newPanel.append(itemSpan);

    // return the panel to initializePanels function
    return newPanel;
  };

  // This function displays a messgae when there are no items
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for item #" + id;
    }
    panelBody.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No items yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    panelBody.append(messageh2);
  }
});
