/* global Template */
/* global Session */
/* global Meteor */
/* global Router */
// Meteor.subscribe("users");
// Meteor.subscribe("chats");


// set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: "loading"
});

// specify the top level route, the page users see when they arrive at the site
Router.route('/', {
    waitOn: function () {
        return Meteor.subscribe("users");
    },
    action: function () {
        this.render("navbar", { to: "header" });
        this.render("lobby_page", { to: "main" });  
    }
});

// specify a route that allows the current user to chat with another user
Router.route('/chat/:_id', {
    waitOn: function () {
        return Meteor.subscribe("chats");
    }, 
    action: function () {
        // the user they want to chat to has id equal to 
        // the id sent in after /chat/... 
        
        // don't route if not logged in
        if(!Meteor.userId()) {
            alert("You must login first! Redirecting you back to the home page.");
            Router.go("/");
            return; 
        }
        
        var chatId;
        var otherUserId = this.params._id;
        // find a chat that has two users that match current user id
        // and the requested user id
        var filter = {$or:[
                    {user1Id:Meteor.userId(), user2Id:otherUserId}, 
                    {user2Id:Meteor.userId(), user1Id:otherUserId}
                    ]};
        var chat = Chats.findOne(filter);
        if (!chat){// no chat matching the filter - need to insert a new one
        //   chatId = Chats.insert({user1Id:Meteor.userId(), user2Id:otherUserId});
            Meteor.call("addChat", {user1Id:Meteor.userId(), user2Id:otherUserId}, function (err, result) {
                if (!err && result) {
                    Session.set("chatId", result);
                }
            });
        }
        else {// there is a chat going already - use that. 
            chatId = chat._id;
        }
        if (chatId){// looking good, save the id to the session
            Session.set("chatId",chatId);
        }
        this.render("navbar", {to:"header"});
        this.render("chat_page", {to:"main"});  
    }
});
  

///
// helper functions 
/// 
Template.available_user_list.helpers({
    users: function () {
        return Meteor.users.find();
    }
});

Template.available_user.helpers({
    getUsername: function (userId) {
        var user = Meteor.users.findOne({ _id: userId });
        return user.profile.username;
    },
    isMyUser: function (userId) {
        if (userId == Meteor.userId()) {
            return true;
        }
        else {
            return false;
        }
    }
});


Template.chat_page.helpers({
    messages: function () {
        var chat = Chats.findOne({ _id: Session.get("chatId") });
        return chat.messages;
    },
    other_user: function () {
        return ""
    },

});

Template.chat_message.helpers({
    getTime: function () {
        return this.date.toLocaleTimeString();
    }
});
  
////////
// EVENTS
////////
Template.chat_page.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat': function (event) {
        // stop the form from triggering a page reload
        event.preventDefault();
        // see if we can find a chat object in the database
        // to which we'll add the message
        var chat = Chats.findOne({ _id: Session.get("chatId") });
        if (chat) {// ok - we have a chat to use
            var msgs = chat.messages; // pull the messages property
            if (!msgs) {// no messages yet, create a new array
                msgs = [];
            }
            // is a good idea to insert data straight from the form
            // (i.e. the user) into the database?? certainly not. 
            // push adds the message to the end of the array
            msgs.push({
                text: event.target.chat.value,
                userName: Meteor.user().profile.username,
                avatar: Meteor.user().profile.avatar,
                date: new Date()
            });
            // reset the form
            event.target.chat.value = "";
            // put the messages array onto the chat object
            chat.messages = msgs;
            // update the chat object in the database.
            //   Chats.update(chat._id, chat);
            Meteor.call("updateChat", chat._id, chat);
        }
    }
});

