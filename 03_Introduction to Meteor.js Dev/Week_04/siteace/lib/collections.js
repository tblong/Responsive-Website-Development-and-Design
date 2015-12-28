Websites = new Mongo.Collection("websites");

Websites.allow({
    update: function (userId, doc) {
        return userId !== null;
    },

    insert: function (userId, doc) {
        return userId !== null;
    },

    remove: function (userId, doc) {
        return false;
    }
});