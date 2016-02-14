/* global $ */
/* global Meteor */
/* global Router */
// set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: "loading"
});

// specify the top level route, the page users see when they arrive at the site
Router.route("/", {
    waitOn: function () {
        console.log("router: waiting on musicMachine subscription");
        return Meteor.subscribe("musicMachine");
    },
    action: function () {
        console.log("router: in action");
        this.render("navbar", { to: "header" });
        this.render("home", { to: "main" });
    }

});

//  credits route
Router.route("/credits", function () {
    this.render("navbar", { to: "header" });
    this.render("credits", { to: "main" });
});