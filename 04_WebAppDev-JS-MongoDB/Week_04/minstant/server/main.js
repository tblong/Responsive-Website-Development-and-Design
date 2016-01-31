Meteor.publish("users", function () {
    // Meteor._sleepForMs(2000); // simulate slow network
    return Meteor.users.find({});
});

Meteor.publish("chats", function () {
    return Chats.find({
        $or: [
            { user1Id: this.userId },
            { user2Id: this.userId }
        ]
    });
});

// server startup code
// start up script that creates some users for testing
// users have the username 'user1@test.com' .. 'user8@test.com'
// and the password test123 
Meteor.startup(function () {
    if (!Meteor.users.findOne()) {
        for (var i = 1; i < 9; i++) {
            var email = "user" + i + "@test.com";
            var username = "user" + i;
            var avatar = "ava" + i + ".png"
            console.log("creating a user with password 'test123' and username/ email: " + email);
            Meteor.users.insert({ profile: { username: username, avatar: avatar }, emails: [{ address: email }], services: { password: { "bcrypt": "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO" } } });
        }
    }
});
