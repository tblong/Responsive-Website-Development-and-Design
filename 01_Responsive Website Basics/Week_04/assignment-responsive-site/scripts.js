// my scripts

// handle form submissions
function submitForm(form) {
	event.preventDefault();
	var item = form.itemBox.value.trim();
	var qty = $("#qty").val();
	
	// blank item box
	form.itemBox.value = "";
	
	// valid item check
	if (item == '') {
		alert('Please enter an item');
		document.getElementById('item').focus();
		return;
	}



	console.log('item: ' + item + '\n' + 'quantity: ' + qty);

	// regain focus for item field
	document.getElementById('item').focus();
}

// row click handling
function rowHandler(row) {
	// check if this item is in the cart yet
	var incart = row.getAttribute('incart');
	// console.log("in cart: " + incart);
	if (incart == 'Yes') {
		row.setAttribute('incart', 'No');
		row.lastElementChild.innerHTML = 'No';
	}
	else {
		row.setAttribute('incart', 'Yes');
		row.lastElementChild.innerHTML = 'Yes'
	}

}

