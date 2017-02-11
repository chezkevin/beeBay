// Getting jQuery references to the item div
//var itemContainer = $(".item-container");
//var panel = $(".panel.panel-default");
var panelBody = $(".panel-body.items");
var buttonClass = ".bid-btn.btn.btn-success";
var items;

// get and display list of items.
getItems("");

// event listener for bidding from the item list page

$(document).on('click', 'button', function(e) {
    var newBid = Number($(this).prev().val());
    var itemId = $(this).attr('id');
    if (isNaN(newBid)) {
        alert("Please enter a number.");
    } else {
        checkBid(itemId, newBid);
    }
});

// this function makes an api call and stores the data in the items array
// then, calls initializePanels to display the items
function getItems(item) {
    itemId = item || "";
    if (itemId) {
        itemId = "/?itemId=" + itemId;
    }
    $.get("/api/items" + itemId, function(data) {
        //console.log("Items", data);
        items = data;
        if (!items || !items.length) {
            displayEmpty(item);
        } else {
            initializePanels();
        }
    });
}

// this function initializes the item panels
// calls a panel function and appends to panel body
function initializePanels() {
    panelBody.empty();
    var itemsToAdd = [];
    for (var i = 0; i < items.length; i++) {
        itemsToAdd.push(createNewPanel(items[i]));
    }
    panelBody.append(itemsToAdd);
}

// this function creates the html of an item in a panel
function createNewPanel(item) {
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
    var itemCat = $("<p>");
    var itemCurrentPrice = $("<p>");
    var itemEndTime = $("<p>");
    var bidContainer = $("<div>");
    var bidInput = $("<input>");
    var bidBtn = $("<button>");

    // add classes to item span
    itemSpan.addClass("item-details");
    itemH3.addClass("item-header");
    itemCat.addClass("item-cat");
    itemCurrentPrice.addClass("item-current-price");
    itemEndTime.addClass("item-end-time");
    bidContainer.addClass("bid-container");
    bidInput.addClass("bidder");
    bidBtn.addClass("bid-btn");
    bidBtn.addClass("btn btn-success");

    // populate item content
    itemLink.attr('href', '/api/items/' + item.id);
    itemH3.text(item.item_name);
    itemCat.text(item.category);
    itemCurrentPrice.text("Current bid: " + item.current_price);
    itemEndTime.text("End time: " + item.end_time);
    itemLink.append(itemH3);
    bidBtn.attr('type', 'submit');
    bidBtn.attr('href', '/api/items/bid/' + item.id);
    bidBtn.attr('id', item.id);
    bidBtn.text("Bid now");

    bidContainer.append(bidInput)
        .append(bidBtn);

    itemSpan.append(itemLink)
        .append(itemCat)
        .append(itemCurrentPrice)
        .append(bidContainer)
        .append(itemEndTime);

    // add item content to panel
    newPanel.append(imageThumb);
    newPanel.append(itemSpan);

    // return the panel to initializePanels function
    return newPanel;
}

// This function displays a messgae when there are no items
function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
        partial = " for item #" + id;
    }
    panelBody.empty();
    var messageh2 = $("<h2>");
    messageh2.css({
        "text-align": "center",
        "margin-top": "50px"
    });
    messageh2.html("No items yet" + partial + ", navigate <a href='/cms" + query +
        "'>here</a> in order to get started.");
    panelBody.append(messageh2);
}

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

function makeBid(itemId, bid) {

    var data = {
        bid: bid
    };

    $.ajax({
        url: '/api/items/bid/' + itemId,
        type: 'PUT',
        data: data,
        contentType: 'application/json',
        success: function(result) {
            window.location.href = "/";
        },
        error: function(request, msg, error) {
            // handle failure
            console.log(request);
            console.log(msg);
            console.log(error);
        }
    });
}
