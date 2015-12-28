/* global Comments */
/* global Router */
/* global Accounts */
/* global $ */
/* global Mongo */
/* global Websites */
/* global Template */
/* global Meteor */


if (Meteor.isClient) {
    // comments ui config
    Comments.ui.config({
        template: "bootstrap"
    });
    
    // router config
    Router.configure({
        layoutTemplate: "ApplicationLayout"
    });
    
    // root route
    Router.route("/", function () {
        this.render("navbar", {
            to: "navbar"
        });
        this.render("website_form", {
            to: "siteform"
        });
        this.render("website_list", {
            to: "main"
        });
    });
    
    // indivitual site routes
    Router.route("website/:_id", function () {
        this.render("navbar", {
            to: "navbar"
        });
        this.render("site_detail", {
            to: "main",
            data: function () {
                return Websites.findOne({ _id: this.params._id });
            }
        });
    });
    
    
    
    
    // accounts config
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });

    /////
    // template helpers 
    /////
    
    // site detail helpers
    Template.site_detail.helpers({
        getUserName: function () {
            var user = Meteor.users.findOne({ _id: this.addedBy });
            if (user) {
                return user.username
            }
            else {
                return "anon";
            }
        },
        prettyDate: function () {
            return this.createdOn.toLocaleString();
        }
    });

    // helper function that returns all available websites
    Template.website_list.helpers({
        websites: function () {
            return Websites.find({}, {
                sort: {
                    votes: -1
                }
            });
        }
    });

    Template.website_item.helpers({
        prettyDate: function () {
            return this.createdOn.toLocaleString();
        }
    });


    /////
    // template events 
    /////

    Template.website_item.events({
        "click .js-upvote": function (event) {

            event.preventDefault();

            if (!Meteor.user()) {
                alert("You must be logged in to vote!");
                return;
            }

            Websites.update({ _id: this._id }, {
                $set: {
                    votes: this.votes + 1
                }
            });

        },
        "click .js-downvote": function (event) {

            event.preventDefault();

            if (!Meteor.user()) {
                alert("You must be logged in to vote!");
                return;
            }

            Websites.update({ _id: this._id }, {
                $set: {
                    votes: this.votes - 1
                }
            });

        }
    })

    Template.website_form.events({
        "click .js-toggle-website-form": function (event) {
            $("#website_form").toggle('slow');
        },
        "submit .js-save-website-form": function (event) {

            event.preventDefault();
            
            // ensure user is logged in first
            if (Meteor.user() === null) {
                alert("Please login first.");
                return;
            }
            
            // validate user inputs for url and description
            var url = event.target.url.value;
            if (url == "") {
                alert("Please enter a Site address.");
                return;
            }
            var title = event.target.title.value;
            // if (title == "") {
            //     alert("Please enter a Title.");
            //     return;
            // }
            var description = event.target.description.value;
            if (description == "") {
                alert("Please enter a Description.");
                return;
            }

            // update db
            Websites.insert({
                url: url,
                title: title,
                description: description,
                votes: 0,
                addedBy: Meteor.userId(),
                createdOn: new Date(),
            });
            
            // blank out form inputs
            event.target.url.value = "";
            event.target.title.value = "";
            event.target.description.value = "";

        }
    });
}


if (Meteor.isServer) {
    // start up function that creates entries in the Websites databases.
    Meteor.startup(function () {
        // code to run on server at startup
        if (!Websites.findOne()) {
            console.log("No websites yet. Creating starter data.");
            Websites.insert({
                title: "Goldsmiths Computing Department",
                url: "http://www.gold.ac.uk/computing/",
                description: "This is where this course was developed.",
                votes: 0,
                createdOn: new Date()
            });
            Websites.insert({
                title: "University of London",
                url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
                description: "University of London International Programme.",
                votes: 0,
                createdOn: new Date()
            });
            Websites.insert({
                title: "Coursera",
                url: "http://www.coursera.org",
                description: "Universal access to the world’s best education.",
                votes: 0,
                createdOn: new Date()
            });
            Websites.insert({
                title: "Google",
                url: "http://www.google.com",
                description: "Popular search engine.",
                votes: 0,
                createdOn: new Date()
            });
        }
    });
}
