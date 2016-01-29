/* global Router */
/* global EditingUsers */
/* global $ */
/* global Documents */
/* global Session */
/* global Template */
/* global Meteor */
Meteor.subscribe("documents");
Meteor.subscribe("editingUsers");

// Router config
Router.configure({
    layoutTemplate: "ApplicationLayout"
});

Router.route("/", function () {
    this.render("navbar", { to: "header" });
    this.render("docList", { to: "main" });
});

Router.route("/documents/:_id", function () {
    Session.set("docid", this.params._id);
    this.render("navbar", { to: "header" });
    this.render("docItem", { to: "main" });
});

// Session.set("current_date", new Date());
    
// update current_date session key
// Meteor.setInterval(function () {
//     Session.set("current_date", new Date());
// }, 1000);
    
// date_display helpers
// Template.date_display.helpers({
//     current_date: function () {
//         return Session.get("current_date");
//     }
// });
    
// editing users helpers
Template.editingUsers.helpers({
    users: function () {
        var doc, eusers, users;

        doc = Documents.findOne({ _id: Session.get("docid") });
        if (!doc) { return; }
        eusers = EditingUsers.findOne({ docid: doc._id });
        if (!eusers) { return; }

        users = [];

        for (var user_id in eusers.users) {
            users.push(fixObjectProps(eusers.users[user_id]));
        }

        return users;
    }
});
    
    
// editor helpers
Template.editor.helpers({
    config: function () {
        return function (editor) {
            editor.setOption("lineNumbers", true);
            // editor.setOption("mode", "htmlmixed");
            editor.setOption("theme", "monokai");
            // editor.setOption("keyMap", "sublime");
            // editor.setTheme("codemirror/theme/cobalt");
                
            editor.on("change", function (cm_editor, info) {
                // console.log(cm_editor.getValue());
                $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
                Meteor.call("addEditingUser", Session.get("docid"));
            });
        }
    },
    docid: function () {

        setupCurrentDocument();
        return Session.get("docid");
            
        // var doc = Documents.findOne();
        // // validate doc
        // if (doc) {
        //     return doc._id;
        // }
        // // doc not ready yet
        // return undefined;
    }
});

Template.navbar.helpers({
    documents: function () {
        return Documents.find();
    }
});

Template.docList.helpers({
    documents: function () {
        return Documents.find();
    }
});

Template.docMeta.helpers({
    canEdit: function () {
        var doc;
        doc = Documents.findOne({ _id: Session.get("docid") });
        if (doc) {
            if (doc.owner == Meteor.userId()) {
                return true;
            }
        }

        return false;

    },
    document: function () {
        return Documents.findOne({ _id: Session.get("docid") });
    }
});

Template.editableText.helpers({
    userCanEdit: function (doc, Collection) {
        var doc = Documents.findOne({ _id: Session.get("docid"), owner: Meteor.userId() });
        if (doc) {
            return true;
        }

        return false;
    }
});
    
////////
// Events
////////
    
Template.docMeta.events({
    "click .js-tog-private": function (event) {
        console.log(event.target.checked);
        var doc = {
            _id: Session.get("docid"),
            isPrivate: event.target.checked
        };

        Meteor.call("updateDocPrivacy", doc);
    }
});

Template.navbar.events({
    "click .js-load-doc": function (event) {
        Session.set("docid", this._id);
    },
    "click .js-add-doc": function (event) {
        event.preventDefault();
            
        // check if logged in
        if (!Meteor.user()) {
            alert("You need to login first!");
            return;
        }

        Meteor.call("addDoc", function (error, result) {
            if (!error) {
                Session.set("docid", result);
            }
        });
    }
});

function setupCurrentDocument() {
    var doc;
    
    // see if docid is set yet
    if (!Session.get("docid")) {
        doc = Documents.findOne();
        if (doc) {
            Session.set("docid", doc._id)
        }
    }


}

function fixObjectProps(obj) {
    var result = {};

    for (var key in obj) {
        var newKey = key.replace("-", "");
        result[newKey] = obj[key];
    }

    return result;
}