this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient) {
    
    // editor helpers
    Template.editor.helpers({
        docid: function () {

            var doc = Documents.findOne();
            if (doc) {
                return doc._id;
            }

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
