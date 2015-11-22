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
	
	// categories nav click handler
	$('a.nav-categories').click(function () {
		showTemplate('#content', categoryTemplate, animals_data);
		updateActiveNavTab('#categories-tab');
		$('a.category-thumb').click(categoryHandler);
	});
	
	// category click handler
	$('a.nav-link, a.category-thumb').click(categoryHandler);
	
	// current category click handler
	$('a.nav-current-category').click(function () {
		showTemplate('#content', animalsTemplate, current_category);
		updateActiveNavTab('#current-category-tab');
		$('a.animal-thumb').click(animalHandler);

	});
	
	// current animal click handler
	$('a.nav-current-animal').click(function () {
		showTemplate('#content', animalTemplate, current_animal);
		updateActiveNavTab('#current-animal-tab');
	});

});

// category click handler
function categoryHandler() {		
	// get category index clicked on
	var index = $(this).data('id');
		
	// set current category
	current_category = animals_data.category[index];

	showTemplate('#content', animalsTemplate, current_category);

	updateActiveNavTab('#current-category-tab');
		
	// animal click handler
	$('a.animal-thumb').click(animalHandler);

}

// animal click handler
function animalHandler() {
	var index = $(this).data('id');
		
	// set current animal
	current_animal = current_category.animals[index];

	showTemplate('#content', animalTemplate, current_animal);

	updateActiveNavTab('#current-animal-tab');
}