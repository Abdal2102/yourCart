// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Items',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Items',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Summary',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Summary',
    window:win2
});

	


var itemModel = [
	{imgButn:"images/imageCamera.jpg", itemName:"itemName", itemQty:"itemQty", itemCost:"itemCost"},
	//{imgButn:"images/imageCamera.jpg", itemName:"itemName", itemQty:"itemQty", itemCost:"itemCost"},
	//{imgButn:"images/imageCamera.jpg", itemName:"itemName", itemQty:"itemQty", itemCost:"itemCost"},
	//{imgButn:"images/imageCamera.jpg", itemName:"itemName", itemQty:"itemQty", itemCost:"itemCost"},
	//{imgButn:"images/imageCamera.jpg", itemName:"itemName", itemQty:"itemQty", itemCost:"itemCost"}
	
];

var itemsList = [];


for (var i=0; i<itemModel.length; i++) {
	
	var itemsView = Ti.UI.createView({
		color: "grey",
		height:36,
		width:"auto",
		top:0,
		left:0
		//rowHeight:40
	});
	
	var itemsRow = Ti.UI.createTableViewRow({
		//title:itemModel[i].itemName,
		backgroundColor:"ffffff",
		searchFilter: itemModel[i].itemName
	});
	
	var doneButn = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.DONE,
		bottom:0
	});//DONE SYSTEM BUTTON

	doneButn.addEventListener("click", function(e){
		//itemQty = itemQty.value;
		itemQty.blur();
		//itemQty.visible = true;
		itemCost.blur();
		//itemCost.visible = true;
		//itemCost = itemCost.value;
		
	});
	
	var itemName = Ti.UI.createTextField({
		hintText:"item name",
		top:5,
		left:40,
		height:30,
		width:100,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Ti.UI.KEYBOARD_DEFAULT
	});
	

	var itemQty = Ti.UI.createTextField({
		hintText:"Qty",
		height:30,
		width:50,
		top:5,
		right:60,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Ti.UI.KEYBOARD_DECIMAL_PAD,
		keyboardToolbar: [doneButn]
	});
	
	/*itemQty.addEventListener("click", function(e){
		if(e.value == "Qty"){
			e.source.value="";
		}
	});
	
	itemQty.addEventListener("blur", function(e){
		if(e.value == "") {
			e.source.value = "Qty"
		}
	});*/
	
	var itemCost = Ti.UI.createTextField({
		hintText:"Cost",
		height:30,
		width:50,
		top:5,
		right:10,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Ti.UI.KEYBOARD_DECIMAL_PAD,
		keyboardToolbar: [doneButn]
	});
	

	var imgButn = Ti.UI.createButton({
		image:"images/imageCamera.jpg",
		top:5,
		left:5,
		height:30,
		width:30,
	});
	
	var photoDialog = Ti.UI.createOptionDialog({
		title:"Select One",
		options:["Camera", "Gallery", "Cancel"],
		cancel:2
	});

imgButn.addEventListener("click", function(e){
	photoDialog.show();
});

photoDialog.addEventListener("click", function(e){
	Ti.API.info("Your selection is" + e.index);
	
	if (e.index==0){
		Ti.Media.showCamera({
			success:function(e){
				var imageItem = imgButn.image;
			},
			
			error:function(e){
				alert("There was an error");
			},
			cancel:function(e){
				alert("Cancelled");
			},
			allowImageEditing:true,
			saveToPhotoGallery:false,
		});
		
		photoWin.add(imgageItem);
		
	}else if (e.index==1){
		Ti.Media.openPhotoGallery({
			success:function(e){
				
			},
			
			cancel:function(e){
				alert("cancelled");
			}
		})
	}
});
	
	itemsRow.addEventListener("click", function(e){

	var win3 = Ti.UI.createWindow({
		url:e.source.js,
		backgroundColor:"white",
		title:e.itemName
});	
	tab1.open(win3, {animated:true});
	
});
	
	itemsRow.add(itemsView);
	itemsRow.add(itemName);
	itemsRow.add(itemQty);
	itemsRow.add(imgButn);
	itemsRow.add(itemCost);
	
	/*itemsRow.addEventListener("click", function(e){
		itemName.blur();
		itemCost.blur();
		itemQty.blur();
	})*/
	
	itemsList.push(itemsRow);
	
	var itemsTable = Ti.UI.createTableView({
	data:itemsList,
	editable:true,
	allowsSelectionDuringEditing:true,
	moving:false,
	search:searchBar,
	filterAttribute:"searchFilter"
});

var addButn = Ti.UI.createButton({
	title: "add row"
	});

var editButn = Ti.UI.createButton({
	title: "edit"
	});

addButn.addEventListener("click", function(e){
	
	var itemsRow = Ti.UI.createTableViewRow({
			//title:itemModel[i].itemName,
			backgroundColor:"ffffff",
			//searchFilter: itemModel[i].itemName
	});
	
	
	itemsTable.insertRowAfter(0, itemsRow);
	});
	
	editButn.addEventListener("click", function(e){
		
		if(!itemsTable.editing){
			itemsTable.editing=true;
		}else{
			itemsTable.editing=false;
		}
		//alert("click again to move row");
		
		editButn.addEventListener("click", function(e){
		
		if(!itemsTable.moving){
			itemsTable.moving = true;
		}else{
			itemsTable.moving = false;
		}
		});
	});
	
	
	
	itemsTable.addEventListener("delete", function(e){
		itemsTable.editing = false;
	});
	
	/*itemsTable.addEventListener("click", function(e){
		if(!itemsTable.moving){
			itemsTable.moving = true;
		}else{
			itemsTable.moving = false;
		}
	});*/
	
	itemsTable.addEventListener("move", function(e){
		itemsTable.moving = false;
	});
	//itemsTable.data = itemsList;
	
		var label2 = Titanium.UI.createLabel({
		color:'#999',
		//text:/*'itemImage: '+itemModel[i].imgButn*/ 'itemName: ' +e.source.value+' itemQty: '+e.source.value+ ' itemCost: '+e.source.value,
		top:15,
		left:5,
		font:{fontSize:12,fontFamily:'Helvetica Neue'},
		//textAlign:'center',
		width:'auto'
		});

		win2.add(label2);

}

var searchBar = Ti.UI.createSearchBar({
	showCancel:true,
	hintText:"Search"
})


win1.leftNavButton = addButn;
win1.rightNavButton = editButn;
	
win1.add(itemsTable);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
