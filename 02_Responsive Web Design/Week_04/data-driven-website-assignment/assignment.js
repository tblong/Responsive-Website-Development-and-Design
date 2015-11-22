// put your javascript code here

// template variables
var navCategoryTemplate, categoryTemplate, animalsTemplate, animalTemplate;

// storing the currently displayed category and animal
var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

// track active nav tab
var active_nav_tab = $('li.menu.active');

// helper function to display a template
function showTemplate(id, template, data) {
	var html = template(data);
	$(id).html(html);
}

// Remove 'active' class from current active tab
// Add 'active' class to tab id provided
function updateActiveNavTab(newActiveTabId) {
	// $('.nav-tabs .active').removeClass('active');
	active_nav_tab.removeClass('active');
	active_nav_tab = $(newActiveTabId);
	active_nav_tab.addClass('active');
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

	source = $('#animals-template').html();
	animalsTemplate = Handlebars.compile(source);

	source = $('#animal-template').html();
	animalTemplate = Handlebars.compile(source);
	
	
	// TODO: add click event handlers
	
	// category click handler
	$('a.nav-link, a.category-thumb').click(function () {
		// click handler for animal categories
		
		// get category index clicked on
		var index = $(this).data('id');
		
		// set current category
		current_category = animals_data.category[index];

		showTemplate('#content', animalsTemplate, current_category);
		
		updateActiveNavTab('#current-category-tab');
		
		// animal click handler
		$('a.animal-thumb').click(function () {
			// get animal index clicked on
			var index = $(this).data('id');
		
			// set current animal
			current_animal = current_category.animals[index];

			showTemplate('#content', animalTemplate, current_animal);
			
			updateActiveNavTab('#current-animal-tab');

		});
	});
	

	
	
	// console.log('is it active?: ' + active_tab.hasClass('active'));
	// active_tab.removeClass('active');
	// console.log('is it still active?: ' + active_tab.hasClass('active'));
	// updateActiveNavTab('#current-animal-tab');

});