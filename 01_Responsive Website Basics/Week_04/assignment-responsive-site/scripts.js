// my scripts

// handle form submissions
function submitForm(form) {
	event.preventDefault();
	var item = form.itemBox.value.trim();
	var qty = $("#qty").val();
	var row;
	
	// blank item box
	form.itemBox.value = "";
	
	// valid item check
	if (item == '') {
		alert('Please enter an item');
		document.getElementById('item').focus();
		return;
	}

	row = makeRow(item, qty);
	$('tbody#table-rows').append(row);
	
	// regain focus for item field
	document.getElementById('item').focus();
}

// row maker
function makeRow(item, qty) {
	var row = document.createElement('tr');
	var itemElm = document.createElement('td');
	var qtyElm = document.createElement('td');
	var cartElm = document.createElement('td');

	row.setAttribute('onclick', 'rowHandler(this)');
	row.setAttribute('incart', 'No');

	itemElm.appendChild(document.createTextNode(item));
	qtyElm.appendChild(document.createTextNode(qty));
	cartElm.appendChild(document.createTextNode('No'));

	row.appendChild(itemElm);
	row.appendChild(qtyElm);
	row.appendChild(cartElm);

	return row;
}

// row click handling
function rowHandler(row) {
	// check if this item is in the cart yet
	var incart = row.getAttribute('incart');

	if (incart == 'Yes') {
		row.setAttribute('incart', 'No');
		row.lastElementChild.innerHTML = 'No';
	}
	else {
		row.setAttribute('incart', 'Yes');
		row.lastElementChild.innerHTML = 'Yes&nbsp;<img src="images/cart.png" class="image-responsive" width="16px" alt="">';
	}
}

// remove all rows in the list
function removeItems() {
	$('tbody#table-rows > tr').remove();
	// regain focus for item field
	document.getElementById('item').focus();
}