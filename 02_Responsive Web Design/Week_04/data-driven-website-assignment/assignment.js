// put your javascript code here

// template variables
var navCategoryTemplate, categoryTemplate;

// storing the currently displayed category and animal
var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

// track active nav tab
var active_tab = $('li.menu.active');

// helper function to display a template
function showTemplate(id, template, data) {
	var html = template(data);
	$(id).html(html);
}


// doc ready callback
$(document).ready(function () {
	
	// compile templates
	var source = $('#nav-cat-template').html();
	navCategoryTemplate = Handlebars.compile(source);
	showTemplate('#navbar-main', navCategoryTemplate, animals_data);

	source = $('#category-template').html();
	categoryTemplate = Handlebars.compile(source);
	showTemplate('#content', categoryTemplate, animals_data);
	
	console.log('active tab: ' + active_tab.hasClass('active'));
	active_tab.removeClass('active');
	console.log('is tab now inactive: ' + active_tab.hasClass('active'));
	

});