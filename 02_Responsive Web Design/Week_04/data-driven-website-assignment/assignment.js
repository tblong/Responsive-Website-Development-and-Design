// put your javascript code here

// template variables
var navCategoryTemplate, categoryTemplate;


// helper function to display a template
function showTemplate(id, template, data) {
	var html = template(data);
	$(id).html(html);
}


// doc ready callback
$(document).ready(function() {
	
	// compile templates
	var source = $('#nav-cat-template').html();
	navCategoryTemplate = Handlebars.compile(source);
	showTemplate('#navbar-main', navCategoryTemplate, animals_data);
	
	source = $('#category-template').html();
	categoryTemplate = Handlebars.compile(source);
	showTemplate('#content', categoryTemplate, animals_data);
	
});