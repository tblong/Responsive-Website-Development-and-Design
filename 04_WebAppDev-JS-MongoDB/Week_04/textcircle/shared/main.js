Meteor.methods({
    addComment: function (comment) {
        console.log("entry adding comment method");
        if (this.userId) {
            console.log("adding comment method");
            // comment.createdOn = new Date();
            comment.owner = this.userId;
            return Comments.insert(comment);
        }
        return;
    },
    updateDocPrivacy: function (doc) {
        // console.log(doc);
        var realDoc = Documents.findOne({ _id: doc._id, owner: this.userId });

        if (realDoc) {
            realDoc.isPrivate = doc.isPrivate;
            Documents.update({ _id: doc._id }, realDoc);
        }

    },
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

        var id = Documents.insert(doc);
        return id;

    },
    addEditingUser: function (docid) {
        var doc, userProfile, eusers;
        doc = Documents.findOne({ _id: docid });

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