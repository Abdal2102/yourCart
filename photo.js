var photoWin = Ti.UI.currentWindow;

var itemRowImage = Ti.UI.createImageView({
	image:e.source.imgButn.image,
	height:"auto",
	width:"auto"
})

var itemQtyLabel = Ti.UI.createLabel({
	text:e.itemQty.value,
	height:40,
	width:"auto",
	bottom:20,
	right:50
});

var itemCostLabel = Ti.UI.createLabel({
	text:e.itemCost.value,
	height:40,
	width:"auto",
	bottom:70,
	right:50
})

photoWin.add(itemRowImage);
photoWin.add(itemQtyLabel);
photoWin.add(itemCostLabel);
