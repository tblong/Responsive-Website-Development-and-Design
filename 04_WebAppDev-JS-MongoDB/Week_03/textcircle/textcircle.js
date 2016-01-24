/* global EditingUsers */
/* global $ */
/* global Session */
/* global Mongo */
/* global Documents */
/* global Template */
/* global Meteor */
this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

if (Meteor.isClient) {

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

            doc = Documents.findOne();
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
                    Meteor.call("addEditingUser");
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
    
    ////////
    // Events
    ////////
    
    Template.navbar.events({
        "click .js-add-doc": function (event) {
            event.preventDefault();
            
            // check if logged in
            if (!Meteor.user()) {
                alert("You need to login first!");
                return;
            }

            Meteor.call("addDoc");
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        if (!Documents.findOne()) {
            // no docs yet
            Documents.insert({
                title: "my new document"
            });
        }
    });
}

Meteor.methods({
    addDoc: function () {
        var doc;
        
        // user logged in check
        if (!this.userId) {
            return;
        }

        doc = {
            owner: this.userId,
            createdOn: new Date(),
            title: "my new doc"
        };

        Documents.insert(doc);

    },
    addEditingUser: function () {
        var doc, userProfile, eusers;
        doc = Documents.findOne();

        if (!doc) { return; } // no doc found
        if (!this.userId) { return; } // no user found
        
        // we have a doc and a user now
        userProfile = Meteor.user().profile;
        eusers = EditingUsers.findOne({ docid: doc._id });

        if (!eusers) {
            eusers = {
                docid: doc._id,
                users: {}
            };
        }

        userProfile.lastEdit = new Date();
        eusers.users[this.userId] = userProfile;

        EditingUsers.upsert({ _id: eusers._id }, eusers);


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
