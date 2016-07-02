/* global $ */
/* global Meteor */
/* global Router */
// set up the main template the the router will use to build pages

    
// console.log("meteor startup called on client");
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: "loading"
});

// specify the top level route
Router.route("/", {
    waitOn: function () {
        // return Meteor.subscribe("musicMachine");
    },
    action: function () {
        this.render("navbar", { to: "header" });
        this.render("home", { to: "main" });
    }

});

//  credits route
Router.route("/credits", function () {
    this.render("navbar", { to: "header" });
    this.render("credits", { to: "main" });
});

// race data route
Router.route("/racedata", {
    waitOn: function () {
        // return Meteor.subscribe("musicMachine");
    },
    action: function () {
        this.render("navbar", { to: "header" });
        this.render("raceData", { to: "main" });
    }
});