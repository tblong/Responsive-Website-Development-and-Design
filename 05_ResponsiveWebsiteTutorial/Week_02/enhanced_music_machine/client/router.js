/* global Meteor */
/* global Router */
// set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: "loading"
});

// specify the top level route, the page users see when they arrive at the site
Router.route('/', {
    waitOn: function () {
        return Meteor.subscribe("musicMachine");
    },
    action: function () {
        this.render("navbar", { to: "header" });
        this.render("home", { to: "main" });
    },
    onAfterAction: function() {
        console.log($("#mixer"));
        $("#mixer").toggleClass("active");
    }
});