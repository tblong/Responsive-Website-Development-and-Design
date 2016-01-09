// this is image_share.js
Images = new Mongo.Collection("images");

// set up security on Images collection
Images.allow({

    // we need to be able to update images for ratings.
    update: function (userId, doc) {
        console.log("testing security on image update");
        if (Meteor.user()) {// they are logged in
            return true;
        } else {// user not logged in - do not let them update  (rate) the image. 
            return false;
        }
    },

    insert: function (userId, doc) {
        console.log("testing security on image insert");
        if (Meteor.user()) {// they are logged in
            if (userId != doc.createdBy) {// the user is messing about
                return false;
            }
            else {// the user is logged in, the image has the correct user id
                return true;
            }
        }
        else {// user not logged in
            return false;
        }
    },
    remove: function (userId, doc) {
        return Meteor.user() !== null;
    }
})



