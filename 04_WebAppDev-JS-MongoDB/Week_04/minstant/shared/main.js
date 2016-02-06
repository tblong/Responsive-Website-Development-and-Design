// Meteor methods
Meteor.methods({
    updateChat: function (id, chat) {
        // logged in check
        if (!this.userId) {
            return;
        }
        Chats.update(id, chat);
    },
    addChat: function (users) {   
        // logged in check
        if (!this.userId) {
            return;
        }

        return Chats.insert(users);
    }
});
