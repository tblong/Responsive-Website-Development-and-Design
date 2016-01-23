/* global $ */
/* global Session */
/* global Mongo */
/* global Documents */
/* global Template */
/* global Meteor */
this.Documents = new Mongo.Collection("documents");

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
    
    // editor helpers
    Template.editor.helpers({
        config: function () {
            return function (editor) {
                editor.on("change", function (cm_editor, info) {
                    // console.log(cm_editor.getValue());
                    $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
                });
            }
        },
        docid: function () {

            var doc = Documents.findOne();
            // validate doc
            if (doc) {
                return doc._id;
            }
            // doc not ready yet
            return undefined;
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
